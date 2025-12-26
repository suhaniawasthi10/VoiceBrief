import AudioJob, { JOB_STATUSES } from '../models/audioJob.model.js';

/**
 * Audio Service
 * 
 * Business logic for audio job management.
 * Controller stays thin - all logic lives here.
 */

/**
 * Create a new audio job for a user
 * 
 * Called immediately when upload starts.
 * Status: PENDING (waiting for Cloudinary upload)
 * 
 * @param {string} userId - The user's MongoDB ObjectId
 * @param {string} originalFilename - Original name of uploaded file
 * @returns {Promise<AudioJob>} The created job document
 */
export const createJob = async (userId, originalFilename) => {
    const job = await AudioJob.create({
        userId,
        originalFilename,
        status: JOB_STATUSES.PENDING,
    });
    return job;
};

/**
 * Update job with Cloudinary URL and set status to UPLOADED
 * 
 * Called after successful Cloudinary upload.
 * 
 * @param {string} jobId - The job's MongoDB ObjectId
 * @param {string} audioUrl - Cloudinary secure URL
 * @returns {Promise<AudioJob>} Updated job document
 */
export const markAsUploaded = async (jobId, audioUrl) => {
    const job = await AudioJob.findByIdAndUpdate(
        jobId,
        {
            audioUrl,
            status: JOB_STATUSES.UPLOADED,
        },
        { new: true } // Return updated document
    );
    return job;
};

/**
 * Mark job as processing (ASR/LLM in progress)
 * 
 * @param {string} jobId - The job's MongoDB ObjectId
 * @returns {Promise<AudioJob>} Updated job document
 */
export const markAsProcessing = async (jobId) => {
    const job = await AudioJob.findByIdAndUpdate(
        jobId,
        { status: JOB_STATUSES.PROCESSING },
        { new: true }
    );
    return job;
};

/**
 * Mark job as completed with transcript and summary
 * 
 * @param {string} jobId - The job's MongoDB ObjectId
 * @param {string} transcript - Full transcript from Deepgram
 * @param {Object} summary - Structured summary from Groq
 * @returns {Promise<AudioJob>} Updated job document
 */
export const markAsCompleted = async (jobId, transcript, summary) => {
    const job = await AudioJob.findByIdAndUpdate(
        jobId,
        {
            transcript,
            summary,
            status: JOB_STATUSES.COMPLETED,
        },
        { new: true }
    );
    return job;
};

/**
 * Mark job as failed with error message
 * 
 * @param {string} jobId - The job's MongoDB ObjectId
 * @param {string} errorMessage - Description of what went wrong
 * @returns {Promise<AudioJob>} Updated job document
 */
export const markAsFailed = async (jobId, errorMessage) => {
    const job = await AudioJob.findByIdAndUpdate(
        jobId,
        {
            errorMessage,
            status: JOB_STATUSES.FAILED,
        },
        { new: true }
    );
    return job;
};

/**
 * Get a job by ID (with ownership check)
 * 
 * @param {string} jobId - The job's MongoDB ObjectId
 * @param {string} userId - The requesting user's ID (for ownership check)
 * @returns {Promise<AudioJob|null>} Job document or null
 */
export const getJobById = async (jobId, userId) => {
    const job = await AudioJob.findOne({
        _id: jobId,
        userId, // Ensures user can only access their own jobs
    });
    return job;
};


/**
 * Get all jobs for a user (sorted by newe
 * st first) with pagination
 * 
 * @param {string} userId - The user's MongoDB ObjectId
 * @param {number} page - Page number (1-indexed, default: 1)
 * @param {number} limit - Max number of jobs per page (default: 10)
 * @returns {Promise<{jobs: AudioJob[], total: number, page: number, totalPages: number}>}
 */
export const getJobsByUserId = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await AudioJob.countDocuments({ userId });

    // Get paginated jobs
    const jobs = await AudioJob.find({ userId })
        .sort({ createdAt: -1 }) // Newest first
        .skip(skip)
        .limit(limit)
        .select('-transcript'); // Exclude transcript for list view (save bandwidth)

    return {
        jobs,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};

/**
 * Delete a job by ID (with ownership check)
 * 
 * @param {string} jobId - The job's MongoDB ObjectId
 * @param {string} userId - The requesting user's ID (for ownership check)
 * @returns {Promise<AudioJob|null>} Deleted job or null
 */
export const deleteJob = async (jobId, userId) => {
    const job = await AudioJob.findOneAndDelete({
        _id: jobId,
        userId,
    });
    return job;
};
