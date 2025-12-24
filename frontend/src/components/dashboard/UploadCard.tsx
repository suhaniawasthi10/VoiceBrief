import { useRef } from 'react';
import { dashboardStyles as styles, validateAudioFile, FILE_VALIDATION } from './styles';

interface UploadCardProps {
    isUploading: boolean;
    isRecording: boolean;
    onFileSelect: (file: File) => void;
    onValidationError: (error: string) => void;
}

/**
 * Upload flashcard with file selection and client-side validation
 */
export default function UploadCard({
    isUploading,
    isRecording,
    onFileSelect,
    onValidationError,
}: UploadCardProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Client-side validation
        const validationError = validateAudioFile(file);
        if (validationError) {
            onValidationError(validationError);
            // Reset input so user can try again
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            return;
        }

        onFileSelect(file);

        // Reset input after selection
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div style={styles.flashcard} className="glass-card card-hover">
            <div style={styles.flashcardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
            </div>
            <h3 style={styles.flashcardTitle}>Upload Audio File</h3>
            <p style={styles.flashcardDescription}>
                Upload existing audio files for summarization
                <br />
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                    Max {FILE_VALIDATION.MAX_SIZE_DISPLAY} • {FILE_VALIDATION.ALLOWED_EXTENSIONS}
                </span>
            </p>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,.mp3,.wav,.m4a,.opus,.ogg,.webm"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || isRecording}
                style={styles.secondaryButton}
            >
                {isUploading ? 'Uploading...' : 'Choose File'}
            </button>
        </div>
    );
}
