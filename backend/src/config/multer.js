import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

/**
 * Multer Configuration
 * 
 * Handles multipart/form-data for audio file uploads.
 * Files are temporarily stored on disk, then uploaded to Cloudinary.
 * 
 * Validation:
 *   - File types: mp3, wav, m4a, webm, ogg, mp4, mpeg
 *   - Max size: 50MB (enough for ~30min voice notes)
 */

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Temporary upload directory
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Allowed audio MIME types
const ALLOWED_MIME_TYPES = [
    'audio/mpeg',       // .mp3
    'audio/mp3',        // .mp3 (alternative)
    'audio/wav',        // .wav
    'audio/wave',       // .wav (alternative)
    'audio/x-wav',      // .wav (alternative)
    'audio/m4a',        // .m4a
    'audio/x-m4a',      // .m4a (alternative)
    'audio/mp4',        // .m4a (alternative)
    'audio/webm',       // .webm (browser recording)
    'audio/ogg',        // .ogg
    'audio/opus',       // .opus (WhatsApp voice notes)
    'video/webm',       // .webm (some browsers send as video)
];

// File extension whitelist
const ALLOWED_EXTENSIONS = ['.mp3', '.wav', '.m4a', '.webm', '.ogg', '.mp4', '.opus'];

// Max file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

/**
 * Storage configuration
 * 
 * Uses disk storage (not memory) to handle large audio files
 * without consuming too much RAM.
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        // Generate unique filename: userId-timestamp-originalname
        const userId = req.user?.id || 'anonymous';
        const timestamp = Date.now();
        const ext = path.extname(file.originalname).toLowerCase();
        const safeName = `${userId}-${timestamp}${ext}`;
        cb(null, safeName);
    },
});

/**
 * File filter - validates file type before accepting upload
 */
const fileFilter = (req, file, cb) => {
    // Check MIME type
    const isMimeValid = ALLOWED_MIME_TYPES.includes(file.mimetype);

    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    const isExtValid = ALLOWED_EXTENSIONS.includes(ext);

    if (isMimeValid || isExtValid) {
        // Accept file
        cb(null, true);
    } else {
        // Reject file with descriptive error
        const error = new Error(
            `Invalid file type. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`
        );
        error.statusCode = 400;
        cb(error, false);
    }
};

/**
 * Configured multer instance
 * 
 * Usage in routes:
 *   router.post('/upload', upload.single('audio'), controller.upload);
 */
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
});

/**
 * Helper to delete temporary file after Cloudinary upload
 */
export const deleteTempFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Failed to delete temp file: ${filePath}`, err);
        }
    });
};

export { UPLOAD_DIR, MAX_FILE_SIZE, ALLOWED_EXTENSIONS };
export default upload;
