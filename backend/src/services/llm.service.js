import Groq from 'groq-sdk';
import config from '../config/index.js';

/**
 * LLM Summarization Service (Groq)
 * 
 * Uses Groq's Llama 3 model for fast summarization.
 * 
 * Features:
 *   - Chunking for long transcripts
 *   - Map-reduce pattern for multi-chunk processing
 *   - Structured JSON output with retry on parse failure
 *   - Low temperature for consistent output
 */

// Initialize Groq client
const groq = new Groq({
    apiKey: config.groq.apiKey,
});

// Model configuration
const MODEL = 'llama-3.3-70b-versatile';
const TEMPERATURE = 0.3;
const MAX_TOKENS = 2048;

// Chunk size: ~4000 chars (~1000 tokens) leaves room for prompt
const CHUNK_SIZE = 4000;
const MAX_RETRIES = 3;

/**
 * Main summarization function
 * 
 * Handles both short and long transcripts using map-reduce pattern.
 * 
 * @param {string} transcript - Full transcript text
 * @returns {Promise<Object>} Structured summary
 */
export const summarizeTranscript = async (transcript) => {
    if (!transcript || transcript.trim().length === 0) {
        return {
            title: 'Empty Recording',
            summary: 'No speech detected in the audio.',
            actionItems: [],
            keyPoints: [],
        };
    }

    console.log('📝 Starting summarization, transcript length:', transcript.length);

    // Check if chunking is needed
    if (transcript.length <= CHUNK_SIZE) {
        // Short transcript - direct summarization
        return await summarizeChunk(transcript);
    }

    // Long transcript - use map-reduce
    console.log('📝 Long transcript detected, using map-reduce...');
    return await mapReduceSummarize(transcript);
};

/**
 * Summarize a single chunk of text
 */
async function summarizeChunk(text, isPartial = false) {
    const prompt = isPartial
        ? getPartialSummaryPrompt(text)
        : getFullSummaryPrompt(text);

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                model: MODEL,
                temperature: TEMPERATURE,
                max_tokens: MAX_TOKENS,
            });

            const response = completion.choices[0]?.message?.content || '';

            // Parse JSON from response
            const summary = parseJsonResponse(response);

            console.log('✅ Chunk summarized successfully');
            return summary;

        } catch (error) {
            console.error(`❌ Summarization attempt ${attempt} failed:`, error.message);

            if (attempt === MAX_RETRIES) {
                // Return fallback on final failure
                return {
                    title: 'Summarization Failed',
                    summary: text.slice(0, 500) + '...',
                    actionItems: [],
                    keyPoints: ['Unable to process transcript'],
                };
            }
        }
    }
}

/**
 * Map-Reduce summarization for long transcripts
 */
async function mapReduceSummarize(transcript) {
    const chunks = chunkText(transcript, CHUNK_SIZE);
    console.log(`📝 Split into ${chunks.length} chunks`);

    // MAP step: summarize each chunk
    const chunkSummaries = [];
    for (let i = 0; i < chunks.length; i++) {
        console.log(`📝 Processing chunk ${i + 1}/${chunks.length}`);
        const summary = await summarizeChunk(chunks[i], true);
        chunkSummaries.push(summary);
    }

    // REDUCE step: combine summaries
    console.log('📝 Reducing chunk summaries...');
    return await reduceSummaries(chunkSummaries);
}

/**
 * Reduce multiple chunk summaries into one final summary
 */
async function reduceSummaries(summaries) {
    const combinedText = summaries.map((s, i) =>
        `Part ${i + 1}:\nSummary: ${s.summary}\nKey Points: ${s.keyPoints.join(', ')}\nAction Items: ${s.actionItems.join(', ')}`
    ).join('\n\n');

    const prompt = `You are combining multiple partial summaries into one coherent final summary.

Here are the partial summaries:
${combinedText}

Create a unified summary that combines all parts. Output ONLY valid JSON with this exact structure:
{
    "title": "A concise title (5-10 words)",
    "summary": "A comprehensive summary (2-3 paragraphs)",
    "actionItems": ["action 1", "action 2"],
    "keyPoints": ["point 1", "point 2", "point 3"]
}

Output ONLY the JSON, no markdown code blocks, no explanation.`;

    const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: MODEL,
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
    });

    const response = completion.choices[0]?.message?.content || '';
    return parseJsonResponse(response);
}

/**
 * Split text into chunks of roughly equal size
 */
function chunkText(text, maxSize) {
    const chunks = [];
    let start = 0;

    while (start < text.length) {
        let end = start + maxSize;

        if (end < text.length) {
            const lastPeriod = text.lastIndexOf('.', end);
            const lastNewline = text.lastIndexOf('\n', end);
            const breakPoint = Math.max(lastPeriod, lastNewline);

            if (breakPoint > start + maxSize * 0.5) {
                end = breakPoint + 1;
            }
        }

        chunks.push(text.slice(start, end).trim());
        start = end;
    }

    return chunks;
}

/**
 * Parse JSON from LLM response (handles markdown code blocks)
 */
function parseJsonResponse(response) {
    let cleaned = response.trim();
    if (cleaned.startsWith('```json')) {
        cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
        cleaned = cleaned.slice(0, -3);
    }

    const parsed = JSON.parse(cleaned.trim());

    return {
        title: parsed.title || 'Untitled',
        summary: parsed.summary || '',
        actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : [],
        keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
    };
}

/**
 * Prompt for full transcript summarization
 */
function getFullSummaryPrompt(text) {
    return `You are a professional note summarizer. Analyze this voice note transcript and create a structured summary.

TRANSCRIPT:
${text}

Create a summary with:
1. A concise, descriptive title
2. A clear summary (2-3 short paragraphs)
3. Action items mentioned (tasks, to-dos, follow-ups)
4. Key points (important facts, decisions, ideas)

Output ONLY valid JSON with this exact structure:
{
    "title": "A concise title (5-10 words)",
    "summary": "A comprehensive summary",
    "actionItems": ["action 1", "action 2"],
    "keyPoints": ["point 1", "point 2", "point 3"]
}

Output ONLY the JSON, no markdown code blocks, no explanation.`;
}

/**
 * Prompt for partial chunk summarization
 */
function getPartialSummaryPrompt(text) {
    return `Summarize this portion of a voice note transcript. Focus on key information.

TEXT:
${text}

Output ONLY valid JSON:
{
    "title": "Brief topic",
    "summary": "Key points from this section",
    "actionItems": ["any actions mentioned"],
    "keyPoints": ["important points"]
}

Output ONLY the JSON, no markdown code blocks.`;
}
