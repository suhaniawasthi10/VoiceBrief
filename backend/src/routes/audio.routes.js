import express from 'express';
import * as audioController from '../controllers/audio.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../config/multer.js';

/**
 * Audio Routes
 * 
 * All routes require authentication.
 * Upload uses Multer middleware for file handling.
 */

const router = express.Router();

// All audio routes require authentication
router.use(authMiddleware);

/**
 * POST /api/audio/upload
 * 
 * Upload an audio file for processing.
 * Multer handles multipart/form-data and saves file to disk.
 * Field name must be 'audio' in the form data.
 * 
 * Request: multipart/form-data with 'audio' field
 * Response: { message, jobId, status }
 */
router.post('/upload', upload.single('audio'), audioController.uploadAudio);

/**
 * GET /api/audio/jobs
 * 
 * List all jobs for the authenticated user.
 * Query params: ?limit=20 (optional)
 * 
 * Response: { count, jobs: [...] }
 */
router.get('/jobs', audioController.listJobs);

/**
 * GET /api/audio/jobs/:jobId
 * 
 * Get status of a specific job.
 * Used for polling during processing.
 * 
 * Response: { jobId, status, originalFilename, createdAt, ... }
 */
router.get('/jobs/:jobId', audioController.getJobStatus);

/**
 * GET /api/audio/jobs/:jobId/result
 * 
 * Get full result including transcript and summary.
 * Only works for completed jobs.
 * 
 * Response: { jobId, status, transcript, summary, ... }
 */
router.get('/jobs/:jobId/result', audioController.getJobResult);

/**
 * DELETE /api/audio/jobs/:jobId
 * 
 * Delete a job and its associated data.
 * 
 * Response: { message, jobId }
 */
router.delete('/jobs/:jobId', audioController.deleteJob);

export default router;
