import { AssemblyAI } from 'assemblyai';
import config from '../config/index.js';

/**
 * ASR Service (Speech-to-Text)
 * 
 * Uses AssemblyAI's pre-recorded audio API for transcription.
 * 
 * Why AssemblyAI?
 *   - Simple API for pre-recorded audio
 *   - High accuracy transcription
 *   - Supports many audio formats
 *   - Handles audio from URLs (like Cloudinary)
 */

// Initialize AssemblyAI client
const client = new AssemblyAI({
    apiKey: config.assemblyAI.apiKey,
});

/**
 * Transcribe audio from URL
 * 
 * AssemblyAI handles the audio directly from the URL,
 * no need to download it first.
 * 
 * @param {string} audioUrl - Public URL of the audio file (Cloudinary URL)
 * @returns {Promise<Object>} Transcription result with text and metadata
 * 
 * @example
 * const result = await transcribeAudio('https://res.cloudinary.com/...');
 * console.log(result.transcript); // "Hello, this is a test..."
 */
export const transcribeAudio = async (audioUrl) => {
    console.log('🎤 Starting transcription for:', audioUrl);

    // Configure transcription parameters
    const params = {
        audio: audioUrl,
        // Enable automatic language detection (supports Hindi, English, Spanish, etc.)
        language_detection: true,
        // Optional: enable additional features
        // speaker_labels: true,  // Diarization (who said what)
        // punctuate: true,       // Add punctuation (enabled by default)
        // format_text: true,     // Format text (enabled by default)
    };

    // Submit and wait for transcription
    // AssemblyAI handles polling internally
    const transcript = await client.transcripts.transcribe(params);

    // Check for errors
    if (transcript.status === 'error') {
        const error = new Error(transcript.error || 'Transcription failed');
        error.statusCode = 500;
        throw error;
    }

    console.log('✅ Transcription complete:', {
        id: transcript.id,
        duration: transcript.audio_duration,
        wordCount: transcript.words?.length || 0,
        confidence: transcript.confidence,
    });

    return {
        id: transcript.id,
        text: transcript.text,                    // Full transcript text
        confidence: transcript.confidence,        // Overall confidence (0-1)
        audioDuration: transcript.audio_duration, // Duration in seconds
        words: transcript.words,                  // Word-level timestamps (optional)
    };
};

/**
 * Get transcription status (for debugging/monitoring)
 * 
 * @param {string} transcriptId - AssemblyAI transcript ID
 * @returns {Promise<Object>} Transcript status and details
 */
export const getTranscriptStatus = async (transcriptId) => {
    const transcript = await client.transcripts.get(transcriptId);
    return {
        id: transcript.id,
        status: transcript.status,
        text: transcript.text,
        error: transcript.error,
    };
};
