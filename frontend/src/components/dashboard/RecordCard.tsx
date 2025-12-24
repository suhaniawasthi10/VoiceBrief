import { dashboardStyles as styles } from './styles';
import { formatDuration } from '../../hooks/useRecorder';

interface RecordCardProps {
    isRecording: boolean;
    audioBlob: Blob | null;
    duration: number;
    isUploading: boolean;
    onStartRecording: () => void;
    onStopRecording: () => void;
    onSendRecording: () => void;
    onDiscardRecording: () => void;
}

/**
 * Recording flashcard with microphone controls
 */
export default function RecordCard({
    isRecording,
    audioBlob,
    duration,
    isUploading,
    onStartRecording,
    onStopRecording,
    onSendRecording,
    onDiscardRecording,
}: RecordCardProps) {
    return (
        <div style={styles.flashcard} className="glass-card card-hover">
            <div style={styles.flashcardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
            </div>
            <h3 style={styles.flashcardTitle}>Record Voice Note</h3>
            <p style={styles.flashcardDescription}>
                Start recording your thoughts and ideas directly
            </p>

            {!isRecording && !audioBlob ? (
                <button
                    onClick={onStartRecording}
                    disabled={isUploading}
                    style={styles.primaryButton}
                >
                    Start Recording
                </button>
            ) : isRecording ? (
                <div style={styles.recordingBox}>
                    <div className="waveform">
                        <div className="waveform-bar"></div>
                        <div className="waveform-bar"></div>
                        <div className="waveform-bar"></div>
                        <div className="waveform-bar"></div>
                        <div className="waveform-bar"></div>
                    </div>
                    <span style={styles.recordingTime}>{formatDuration(duration)}</span>
                    <button onClick={onStopRecording} style={styles.stopBtn}>
                        Stop
                    </button>
                </div>
            ) : (
                <div style={styles.recordedBox}>
                    <span>✅ {formatDuration(duration)}</span>
                    <button
                        onClick={onSendRecording}
                        disabled={isUploading}
                        style={styles.primaryButton}
                    >
                        {isUploading ? 'Sending...' : 'Send'}
                    </button>
                    <button onClick={onDiscardRecording} style={styles.discardBtn}>
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
}
