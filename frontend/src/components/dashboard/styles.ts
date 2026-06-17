import React from 'react';

/**
 * Shared styles for Dashboard components — Swiss / editorial.
 * Flat surfaces, hairline rules, square corners, monospace meta.
 */

const HAIRLINE = '1px solid var(--color-border)';

export const dashboardStyles: { [key: string]: React.CSSProperties } = {
    // Container
    container: {
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
    },

    // Header
    header: {
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: HAIRLINE,
    },
    headerContent: {
        maxWidth: '960px',
        margin: '0 auto',
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.4rem',
    },
    logoIconCircle: {
        display: 'none',
    },
    logoText: {
        fontSize: '1.0625rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--color-text-primary)',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
    },
    avatar: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-text-secondary)',
    },
    userName: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
    },
    logoutBtn: {
        padding: 0,
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--color-text-secondary)',
        fontSize: '0.8125rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: 'pointer',
    },

    // Main content
    main: {
        padding: '4rem 2rem 6rem',
    },
    content: {
        maxWidth: '960px',
        margin: '0 auto',
    },

    // Hero section — left aligned, demoted
    heroSection: {
        textAlign: 'left' as const,
        marginBottom: '3.5rem',
        paddingBottom: '2.5rem',
        borderBottom: HAIRLINE,
    },
    heroTitle: {
        fontSize: '2.75rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        marginBottom: '0.75rem',
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
        maxWidth: '18ch',
    },
    heroSubtitle: {
        fontSize: '1rem',
        color: 'var(--color-text-secondary)',
        maxWidth: '52ch',
        lineHeight: 1.5,
    },

    // Action row (record + upload)
    flashcardsSection: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        marginBottom: '4rem',
    },
    flashcard: {
        backgroundColor: 'var(--color-bg-card)',
        border: HAIRLINE,
        padding: '2rem',
        textAlign: 'left' as const,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minHeight: '200px',
    },
    flashcardIcon: {
        marginBottom: '1.25rem',
        color: 'var(--color-text-primary)',
        display: 'flex',
    },
    flashcardTitle: {
        fontSize: '1rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--color-text-primary)',
        marginBottom: '0.375rem',
    },
    flashcardDescription: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '1.5rem',
        flex: 1,
        lineHeight: 1.5,
    },

    // Buttons
    primaryButton: {
        width: '100%',
        padding: '0.75rem 1.25rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        backgroundColor: 'var(--color-text-primary)',
        color: '#fff',
        border: '1px solid var(--color-text-primary)',
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
        transition: 'background-color 0.16s ease',
    },
    secondaryButton: {
        width: '100%',
        padding: '0.75rem 1.25rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        backgroundColor: 'transparent',
        color: 'var(--color-text-primary)',
        border: HAIRLINE,
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
        transition: 'border-color 0.16s ease',
    },

    // Recording states
    recordingBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid var(--color-accent)',
        borderRadius: 'var(--radius)',
    },
    recordingTime: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.875rem',
        letterSpacing: '0.04em',
        color: 'var(--color-accent)',
        marginRight: 'auto',
    },
    stopBtn: {
        padding: '0.375rem 0.875rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        backgroundColor: 'var(--color-accent)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
    },
    recordedBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        flexWrap: 'wrap' as const,
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8125rem',
    },
    discardBtn: {
        padding: 0,
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--color-text-muted)',
        fontSize: '0.8125rem',
        cursor: 'pointer',
    },

    // Error display
    errorText: {
        color: 'var(--color-error)',
        marginTop: '1rem',
        fontSize: '0.8125rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.02em',
        textAlign: 'left' as const,
    },

    // Result section — editorial article
    resultSection: {
        backgroundColor: 'var(--color-bg-card)',
        borderTop: '2px solid var(--color-text-primary)',
        padding: '2rem 0 2.5rem',
        marginBottom: '4rem',
    },
    resultHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
        marginBottom: '0.5rem',
    },
    resultTitle: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
        color: 'var(--color-text-primary)',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        flexShrink: 0,
        marginTop: '0.5rem',
    },
    resultFilename: {
        color: 'var(--color-text-muted)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.04em',
        marginBottom: '2rem',
    },
    summaryBox: {
        marginBottom: '2rem',
    },
    summaryLabel: {
        fontSize: '0.6875rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-muted)',
        marginBottom: '0.75rem',
        paddingBottom: '0.5rem',
        borderBottom: HAIRLINE,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    },
    summaryText: {
        color: 'var(--color-text-primary)',
        fontSize: '1.0625rem',
        lineHeight: 1.6,
        maxWidth: '62ch',
    },
    listBox: {
        marginBottom: '2rem',
    },
    list: {
        listStyle: 'none',
        paddingLeft: 0,
        margin: 0,
    },
    listItem: {
        color: 'var(--color-text-primary)',
        fontSize: '0.9375rem',
        lineHeight: 1.5,
        padding: '0.625rem 0',
        borderBottom: HAIRLINE,
        display: 'flex',
        gap: '0.75rem',
    },

    // Notes section
    notesSection: {
        marginTop: '0',
    },
    sectionTitle: {
        fontSize: '0.6875rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
    },

    // Empty state
    emptyState: {
        backgroundColor: 'transparent',
        borderTop: HAIRLINE,
        padding: '3rem 0',
        textAlign: 'left' as const,
    },
    emptyIcon: {
        display: 'none',
    },
    emptyTitle: {
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        marginBottom: '0.375rem',
    },
    emptyDescription: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
    },

    // Jobs list — editorial index
    jobsList: {
        display: 'flex',
        flexDirection: 'column',
        borderTop: HAIRLINE,
    },
    jobCard: {
        backgroundColor: 'transparent',
        borderBottom: HAIRLINE,
        padding: '1rem 0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.375rem',
    },
    jobInfo: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '1rem',
    },
    jobIndex: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        minWidth: '1.75rem',
        flexShrink: 0,
    },
    jobFilename: {
        fontWeight: 500,
        fontSize: '0.9375rem',
        color: 'var(--color-text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
    },
    badge: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6875rem',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
    },
    jobMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '2.75rem',
    },
    jobDate: {
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.04em',
        color: 'var(--color-text-muted)',
    },
    jobActions: {
        display: 'flex',
        gap: '1.25rem',
        alignItems: 'center',
    },
    viewBtn: {
        padding: 0,
        background: 'none',
        color: 'var(--color-accent)',
        border: 'none',
        fontSize: '0.8125rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        cursor: 'pointer',
    },
    deleteBtn: {
        padding: 0,
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--color-text-muted)',
        fontSize: '0.8125rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        cursor: 'pointer',
    },
    jobError: {
        color: 'var(--color-error)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        marginTop: '0.25rem',
        paddingLeft: '2.75rem',
    },
};

// Status labels — mono text, color only for active/failed
export const statusStyles: Record<string, React.CSSProperties> = {
    pending: { color: 'var(--color-accent)' },
    uploaded: { color: 'var(--color-accent)' },
    processing: { color: 'var(--color-accent)' },
    completed: { color: 'var(--color-text-muted)' },
    failed: { color: 'var(--color-error)' },
};

// File validation constants
export const FILE_VALIDATION = {
    MAX_SIZE: 50 * 1024 * 1024, // 50MB
    MAX_SIZE_DISPLAY: '50MB',
    ALLOWED_TYPES: [
        'audio/mpeg',
        'audio/wav',
        'audio/wave',
        'audio/x-wav',
        'audio/mp4',
        'audio/m4a',
        'audio/x-m4a',
        'audio/ogg',
        'audio/webm',
        'audio/opus',
    ],
    ALLOWED_EXTENSIONS: '.mp3, .wav, .m4a, .ogg, .webm, .opus',
};

/**
 * Validate an audio file before upload
 * @returns Error message string or null if valid
 */
export function validateAudioFile(file: File): string | null {
    // Check file size
    if (file.size > FILE_VALIDATION.MAX_SIZE) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(1);
        return `File too large (${sizeMB}MB). Maximum size is ${FILE_VALIDATION.MAX_SIZE_DISPLAY}.`;
    }

    // Check file type
    const isValidType = FILE_VALIDATION.ALLOWED_TYPES.some(type =>
        file.type.includes(type.split('/')[1]) || file.type === type
    );

    // Also check extension as fallback
    const extension = file.name.toLowerCase().split('.').pop();
    const validExtensions = ['mp3', 'wav', 'm4a', 'ogg', 'webm', 'opus'];
    const isValidExtension = extension && validExtensions.includes(extension);

    if (!isValidType && !isValidExtension) {
        return `Invalid file format. Supported formats: ${FILE_VALIDATION.ALLOWED_EXTENSIONS}`;
    }

    return null;
}
