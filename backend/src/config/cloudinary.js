import { v2 as cloudinary } from 'cloudinary';
import config from './index.js';

/**
 * Cloudinary Configuration
 * 
 * Initialize Cloudinary SDK with credentials from environment.
 * Used for uploading and managing audio files in the cloud.
 * 
 * Benefits over local storage:
 *   - No disk space concerns on server
 *   - CDN delivery for faster playback
 *   - Automatic format optimization
 *   - Persistent storage (survives server restarts/deploys)
 */

// Configure Cloudinary with credentials
cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
});

/**
 * Upload audio file to Cloudinary
 * 
 * @param {string} filePath - Local path to the audio file
 * @param {string} jobId - Job ID to use as public_id (for easy retrieval)
 * @returns {Promise<Object>} Cloudinary upload result with secure_url, etc.
 */
export const uploadAudio = async (filePath, jobId) => {
    const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'video', // Cloudinary uses 'video' for audio files
        folder: 'voicebrief/audio', // Organize in folder
        public_id: jobId, // Use jobId as identifier
        overwrite: true,
    });

    return {
        secureUrl: result.secure_url,
        publicId: result.public_id,
        duration: result.duration, // Audio duration in seconds
        format: result.format,
        bytes: result.bytes,
    };
};

/**
 * Delete audio file from Cloudinary
 * 
 * @param {string} publicId - The public_id of the file to delete
 * @returns {Promise<Object>} Cloudinary deletion result
 */
export const deleteAudio = async (publicId) => {
    const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'video',
    });
    return result;
};

export default cloudinary;
