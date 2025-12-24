import * as audioService from './audio.service.js';
import { transcribeAudio } from './asr.service.js';
import { summarizeTranscript } from './llm.service.js';

/**
 * Background Processing Pipeline
 * 
 * Orchestrates the full audio processing workflow:
 *   1. ASR: Transcribe audio (AssemblyAI)
 *   2. LLM: Summarize transcript (Gemini)
 *   3. Store: Save results to database
 * 
 * This runs asynchronously after Cloudinary upload.
 * Uses fire-and-forget pattern - doesn't block HTTP response.
 */

/**
 * Process an uploaded audio job through the full pipeline
 * 
 * @param {string} jobId - MongoDB ObjectId of the job
 * @param {string} audioUrl - Cloudinary URL of the audio file
 */
export const processAudioJob = async (jobId, audioUrl) => {
    console.log('🚀 Starting processing pipeline for job:', jobId);

    try {
        // ========================================
        // STEP 1: Mark as processing
        // ========================================
        await audioService.markAsProcessing(jobId);
        console.log('📍 Job marked as processing');

        // ========================================
        // STEP 2: Transcribe audio (ASR)
        // ========================================
        console.log('🎤 Starting ASR transcription...');
        const asrResult = await transcribeAudio(audioUrl);

        if (!asrResult.text || asrResult.text.trim().length === 0) {
            throw new Error('No speech detected in audio');
        }

        console.log('✅ Transcription complete:', {
            length: asrResult.text.length,
            duration: asrResult.audioDuration,
            confidence: asrResult.confidence,
        });

        // ========================================
        // STEP 3: Summarize transcript (LLM)
        // ========================================
        console.log('📝 Starting LLM summarization...');
        const summary = await summarizeTranscript(asrResult.text);

        console.log('✅ Summarization complete:', {
            title: summary.title,
            actionItems: summary.actionItems.length,
            keyPoints: summary.keyPoints.length,
        });

        // ========================================
        // STEP 4: Store results in database
        // ========================================
        await audioService.markAsCompleted(jobId, asrResult.text, summary);

        console.log('🎉 Job completed successfully:', jobId);

    } catch (error) {
        console.error('❌ Pipeline failed for job:', jobId, error);

        // Mark job as failed with error message
        await audioService.markAsFailed(
            jobId,
            error.message || 'Processing failed'
        );
    }
};
