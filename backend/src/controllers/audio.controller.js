import * as audioService from '../services/audio.service.js';
import { uploadAudio as uploadToCloudinary, deleteAudio as deleteFromCloudinary } from '../config/cloudinary.js';
import { deleteTempFile } from '../config/multer.js';
import { processAudioJob } from '../services/pipeline.service.js';

/**
 * Audio Controller
 * 
 * Thin controller - delegates to audio service.
 * Handles HTTP request/response, validation, and error passing.
 */

/**
 * Upload audio file
 * POST /api/audio/upload
 * 
 * Flow:
 *   1. Multer middleware saves file to disk (already done before this runs)
 *   2. Create job in PENDING status
 *   3. Return jobId immediately (non-blocking)
 *   4. Upload to Cloudinary in background
 *   5. Delete temp file, update job to UPLOADED
 */
export const uploadAudio = async (req, res, next) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            const error = new Error('No audio file provided');
            error.statusCode = 400;
            throw error;
        }

        // Create job record
        const job = await audioService.createJob(
            req.user.id,
            req.file.originalname
        );

        // Log for debugging
        console.log('📁 File received:', {
            jobId: job._id,
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: `${(req.file.size / 1024 / 1024).toFixed(2)} MB`,
        });

        // Return job ID immediately (don't wait for Cloudinary)
        res.status(201).json({
            message: 'Audio upload started',
            jobId: job._id,
            status: job.status,
        });

        // ============================================
        // BACKGROUND: Upload to Cloudinary (fire-and-forget)
        // ============================================
        // This runs AFTER response is sent to client
        processCloudinaryUpload(job._id.toString(), req.file.path)
            .catch(err => console.error('Background upload failed:', err));

    } catch (error) {
        next(error);
    }
};

/**
 * Background function to upload file to Cloudinary
 * Runs after HTTP response is sent (non-blocking)
 */
async function processCloudinaryUpload(jobId, filePath) {
    try {
        console.log('☁️ Starting Cloudinary upload for job:', jobId);

        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(filePath, jobId);

        console.log('☁️ Cloudinary upload complete:', {
            jobId,
            url: cloudinaryResult.secureUrl,
            duration: cloudinaryResult.duration,
        });

        // Update job with Cloudinary URL and set status to UPLOADED
        await audioService.markAsUploaded(jobId, cloudinaryResult.secureUrl);

        // Delete temp file from local disk
        deleteTempFile(filePath);

        console.log('✅ Job marked as uploaded:', jobId);

        // ============================================
        // TRIGGER: Start ASR/LLM processing pipeline
        // ============================================
        processAudioJob(jobId, cloudinaryResult.secureUrl)
            .catch(err => console.error('Pipeline failed:', err));

    } catch (error) {
        console.error('❌ Cloudinary upload failed for job:', jobId, error);

        // Mark job as failed
        await audioService.markAsFailed(jobId, error.message || 'Cloudinary upload failed');

        // Still delete temp file
        deleteTempFile(filePath);
    }
}

/**
 * Get job status
 * GET /api/audio/jobs/:jobId
 * 
 * Used for polling job progress.
 */
export const getJobStatus = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        const job = await audioService.getJobById(jobId, req.user.id);

        if (!job) {
            const error = new Error('Job not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            jobId: job._id,
            status: job.status,
            originalFilename: job.originalFilename,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
            // Include summary if completed
            ...(job.status === 'completed' && {
                summary: job.summary,
            }),
            // Include error if failed
            ...(job.status === 'failed' && {
                error: job.errorMessage,
            }),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get job result (full details including transcript)
 * GET /api/audio/jobs/:jobId/result
 * 
 * Only available for completed jobs.
 */
export const getJobResult = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        const job = await audioService.getJobById(jobId, req.user.id);

        if (!job) {
            const error = new Error('Job not found');
            error.statusCode = 404;
            throw error;
        }

        if (job.status !== 'completed') {
            const error = new Error(`Job is not completed. Current status: ${job.status}`);
            error.statusCode = 400;
            throw error;
        }

        res.status(200).json({
            jobId: job._id,
            status: job.status,
            originalFilename: job.originalFilename,
            audioUrl: job.audioUrl,
            transcript: job.transcript,
            summary: job.summary,
            createdAt: job.createdAt,
            completedAt: job.updatedAt,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * List user's jobs
 * GET /api/audio/jobs
 */
export const listJobs = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const jobs = await audioService.getJobsByUserId(req.user.id, limit);

        res.status(200).json({
            count: jobs.length,
            jobs: jobs.map((job) => ({
                jobId: job._id,
                status: job.status,
                originalFilename: job.originalFilename,
                createdAt: job.createdAt,
                // Include title if available
                ...(job.summary?.title && { title: job.summary.title }),
            })),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a job
 * DELETE /api/audio/jobs/:jobId
 */
export const deleteJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        const job = await audioService.deleteJob(jobId, req.user.id);

        if (!job) {
            const error = new Error('Job not found');
            error.statusCode = 404;
            throw error;
        }

        // Delete from Cloudinary if uploaded
        if (job.audioUrl) {
            const publicId = `voicebrief/audio/${jobId}`;
            deleteFromCloudinary(publicId)
                .catch(err => console.error('Failed to delete from Cloudinary:', err));
        }

        res.status(200).json({
            message: 'Job deleted successfully',
            jobId: job._id,
        });
    } catch (error) {
        next(error);
    }
};
