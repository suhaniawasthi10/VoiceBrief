import { useEffect, useState } from 'react';
import { dashboardStyles as styles, statusStyles } from './styles';
import type { AudioJob } from '../../services/api';

const ITEMS_PER_PAGE = 5;

interface JobsListProps {
    jobs: AudioJob[];
    isLoading: boolean;
    onViewResult: (jobId: string) => void;
    onDeleteJob: (jobId: string) => void;
}

/**
 * Voice notes list with job cards and pagination
 */
export default function JobsList({
    jobs,
    isLoading,
    onViewResult,
    onDeleteJob,
}: JobsListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination
    const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedJobs = jobs.slice(startIndex, endIndex);

    // Clamp current page if it exceeds total (e.g., after deletion).
    // Done in an effect so we never call setState during render.
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const statusLabel: Record<AudioJob['status'], string> = {
        pending: 'Queued',
        uploaded: 'Uploaded',
        processing: 'Transcribing',
        completed: 'Complete',
        failed: 'Failed',
    };

    const getStatusBadge = (status: AudioJob['status']) => {
        const isProcessing = status === 'pending' || status === 'uploaded' || status === 'processing';
        return (
            <span
                style={{ ...styles.badge, ...statusStyles[status] }}
                className={isProcessing ? 'badge-processing' : ''}
            >
                {isProcessing && <span className="caret-blink">·</span>} {statusLabel[status]}
            </span>
        );
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <section style={styles.notesSection}>
            <div style={paginationStyles.header}>
                <h2 style={styles.sectionTitle}>Notes</h2>
                {jobs.length > 0 && (
                    <span style={paginationStyles.count}>
                        {String(jobs.length).padStart(2, '0')} total
                    </span>
                )}
            </div>

            {isLoading ? (
                <div style={styles.emptyState}>
                    <p style={styles.emptyDescription}>Loading…</p>
                </div>
            ) : jobs.length === 0 ? (
                <div style={styles.emptyState}>
                    <h3 style={styles.emptyTitle}>No notes yet</h3>
                    <p style={styles.emptyDescription}>
                        Record or upload audio to get started.
                    </p>
                </div>
            ) : (
                <>
                    <div style={styles.jobsList}>
                        {paginatedJobs.map((job, index) => (
                            <div
                                key={job.jobId}
                                style={styles.jobCard}
                                className="card-hover"
                            >
                                <div style={styles.jobInfo}>
                                    <span style={styles.jobIndex}>
                                        {String(startIndex + index + 1).padStart(2, '0')}
                                    </span>
                                    <span style={styles.jobFilename}>
                                        {job.summary?.title || job.originalFilename}
                                    </span>
                                    {getStatusBadge(job.status)}
                                </div>
                                <div style={styles.jobMeta}>
                                    <span style={styles.jobDate}>
                                        {new Date(job.createdAt).toLocaleDateString()}
                                    </span>
                                    <div style={styles.jobActions}>
                                        {job.status === 'completed' && (
                                            <button
                                                onClick={() => onViewResult(job.jobId)}
                                                style={styles.viewBtn}
                                            >
                                                View
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onDeleteJob(job.jobId)}
                                            style={styles.deleteBtn}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                {job.status === 'failed' && job.error && (
                                    <p style={styles.jobError}>{job.error}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={paginationStyles.container}>
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                style={{
                                    ...paginationStyles.button,
                                    opacity: currentPage === 1 ? 0.5 : 1,
                                }}
                            >
                                ← Prev
                            </button>
                            <span style={paginationStyles.pageInfo}>
                                {String(currentPage).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                style={{
                                    ...paginationStyles.button,
                                    opacity: currentPage === totalPages ? 0.5 : 1,
                                }}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

// Pagination-specific styles
const paginationStyles: { [key: string]: React.CSSProperties } = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '1.25rem',
    },
    count: {
        fontSize: '0.6875rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '1.5rem',
    },
    button: {
        padding: 0,
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--color-text-primary)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'opacity 0.16s',
    },
    pageInfo: {
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        color: 'var(--color-text-muted)',
    },
};
