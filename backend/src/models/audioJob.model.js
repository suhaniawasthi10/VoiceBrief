import mongoose from 'mongoose';

/**
 * AudioJob Model
 * 
 * Represents a voice note processing job.
 * Tracks the lifecycle from upload → processing → completed/failed.
 * 
 * Status Flow:
 *   pending → uploaded → processing → completed
 *                    ↘ failed (on any error)
 */

// Valid job statuses - centralized for consistency
export const JOB_STATUSES = {
    PENDING: 'pending',       // Initial state when job is created
    UPLOADED: 'uploaded',     // Audio successfully uploaded to Cloudinary
    PROCESSING: 'processing', // ASR/summarization in progress
    COMPLETED: 'completed',   // All processing done, results ready
    FAILED: 'failed',         // Something went wrong
};

const audioJobSchema = new mongoose.Schema(
    {
        // Reference to the user who owns this job
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            index: true, // Index for fast user-based queries
        },

        // Cloudinary URL of the uploaded audio file
        audioUrl: {
            type: String,
            default: null, // Set after Cloudinary upload
        },

        // Current status of the job
        status: {
            type: String,
            enum: Object.values(JOB_STATUSES),
            default: JOB_STATUSES.PENDING,
            index: true, // Index for status-based queries
        },

        // Transcript from Deepgram ASR (Phase 5)
        transcript: {
            type: String,
            default: null,
        },

        // Structured summary from Groq LLM
        summary: {
            title: { type: String, default: null },
            summary: { type: String, default: null },
            actionItems: [{ type: String }],
            keyPoints: [{ type: String }],
        },

        // Error message if job failed
        errorMessage: {
            type: String,
            default: null,
        },

        // Original filename (for display purposes)
        originalFilename: {
            type: String,
            default: null,
        },

        // Audio duration in seconds (optional, set after processing)
        duration: {
            type: Number,
            default: null,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

// Compound index for common query: user's jobs sorted by date
audioJobSchema.index({ userId: 1, createdAt: -1 });

const AudioJob = mongoose.model('AudioJob', audioJobSchema);

export default AudioJob;
