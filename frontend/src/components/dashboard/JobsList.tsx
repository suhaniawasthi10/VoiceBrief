import { useState } from 'react';
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

    // Reset to page 1 if current page exceeds total (e.g., after deletion)
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    }

    const getStatusBadge = (status: AudioJob['status']) => {
        const isProcessing = status === 'pending' || status === 'uploaded' || status === 'processing';
        return (
            <span
                style={{ ...styles.badge, ...statusStyles[status] }}
                className={isProcessing ? 'badge-processing' : ''}
            >
                {status.toUpperCase()}
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
                <h2 style={styles.sectionTitle}>Your Voice Notes</h2>
                {jobs.length > 0 && (
                    <span style={paginationStyles.count}>
                        {jobs.length} note{jobs.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {isLoading ? (
                <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>⏳</div>
                    <p style={styles.emptyDescription}>Loading...</p>
                </div>
            ) : jobs.length === 0 ? (
                <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>📝</div>
                    <h3 style={styles.emptyTitle}>No voice notes yet</h3>
                    <p style={styles.emptyDescription}>
                        Upload an audio file to get started.
                    </p>
                </div>
            ) : (
                <>
                    <div style={styles.jobsList}>
                        {paginatedJobs.map((job) => (
                            <div
                                key={job.jobId}
                                style={styles.jobCard}
                                className="glass-card card-hover"
                            >
                                <div style={styles.jobInfo}>
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
                                                className="btn-glow"
                                            >
                                                View
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onDeleteJob(job.jobId)}
                                            style={styles.deleteBtn}
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </div>
                                {job.status === 'failed' && job.error && (
                                    <p style={styles.jobError}>Error: {job.error}</p>
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
                                Page {currentPage} of {totalPages}
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
        alignItems: 'center',
        marginBottom: '1rem',
    },
    count: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '1.5rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--color-border)',
    },
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        color: 'var(--color-text-primary)',
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    pageInfo: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
};
