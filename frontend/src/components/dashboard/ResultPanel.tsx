import { dashboardStyles as styles } from './styles';
import type { AudioJob } from '../../services/api';

interface ResultPanelProps {
    job: AudioJob;
    onClose: () => void;
}

/**
 * Result panel showing summary, key points, and action items
 */
export default function ResultPanel({ job, onClose }: ResultPanelProps) {
    if (!job.summary) return null;

    return (
        <section style={styles.resultSection} className="glass-card celebrate">
            <div style={styles.resultHeader}>
                <h2 style={styles.resultTitle} className="gradient-text">
                    {job.summary.title}
                </h2>
                <button onClick={onClose} style={styles.closeButton}>
                    ✕
                </button>
            </div>
            <p style={styles.resultFilename}>
                {job.originalFilename}
            </p>

            <div style={styles.summaryBox}>
                <h3 style={styles.summaryLabel}>Summary</h3>
                <p style={styles.summaryText}>
                    {job.summary.summary}
                </p>
            </div>

            {job.summary.keyPoints.length > 0 && (
                <div style={styles.listBox}>
                    <h3 style={styles.summaryLabel}>Key Points</h3>
                    <ul style={styles.list}>
                        {job.summary.keyPoints.map((point, i) => (
                            <li key={i} style={styles.listItem}>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {job.summary.actionItems.length > 0 && (
                <div style={styles.listBox}>
                    <h3 style={styles.summaryLabel}>Action Items</h3>
                    <ul style={styles.list}>
                        {job.summary.actionItems.map((item, i) => (
                            <li key={i} style={styles.listItem}>
                                ☐ {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
