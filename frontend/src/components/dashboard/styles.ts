import React from 'react';

/**
 * Shared styles for Dashboard components
 * Extracted from the monolithic Dashboard.tsx for reusability
 */

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
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
    },
    headerContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    logoIconCircle: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'rgba(20, 184, 166, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    avatar: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 600,
        fontSize: '0.9375rem',
    },
    userName: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.9375rem',
    },
    logoutBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'pointer',
    },

    // Main content
    main: {
        padding: '3rem 2rem',
    },
    content: {
        maxWidth: '1000px',
        margin: '0 auto',
    },

    // Hero section
    heroSection: {
        textAlign: 'center' as const,
        marginBottom: '3rem',
    },
    heroTitle: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        marginBottom: '1rem',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
    },
    heroSubtitle: {
        fontSize: '1rem',
        color: 'var(--color-text-secondary)',
        maxWidth: '600px',
        margin: '0 auto',
    },

    // Flashcards section
    flashcardsSection: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    flashcard: {
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: '2rem',
        textAlign: 'center' as const,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '320px',
    },
    flashcardIcon: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(20, 184, 166, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1rem',
    },
    flashcardTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        marginBottom: '0.5rem',
    },
    flashcardDescription: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },

    // Buttons
    primaryButton: {
        width: '100%',
        padding: '0.875rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 600,
        background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    secondaryButton: {
        width: '100%',
        padding: '0.875rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: 'transparent',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },

    // Recording states
    recordingBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '0.75rem',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: '10px',
    },
    recordingTime: {
        fontSize: '1rem',
        fontWeight: 600,
        color: '#ef4444',
    },
    stopBtn: {
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        backgroundColor: '#ef4444',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    recordedBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        color: 'var(--color-text-primary)',
    },
    discardBtn: {
        padding: '0.5rem 0.75rem',
        backgroundColor: 'transparent',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-secondary)',
        borderRadius: '8px',
        cursor: 'pointer',
    },

    // Error display
    errorText: {
        color: '#f87171',
        marginTop: '0.5rem',
        textAlign: 'center' as const,
    },

    // Result section
    resultSection: {
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
    },
    resultHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.5rem',
    },
    resultTitle: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '1.25rem',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
    },
    resultFilename: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
        marginBottom: '1rem',
    },
    summaryBox: {
        marginBottom: '1rem',
    },
    summaryLabel: {
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    summaryText: {
        color: 'var(--color-text-primary)',
        lineHeight: 1.6,
    },
    listBox: {
        marginBottom: '1rem',
    },
    list: {
        paddingLeft: '1.25rem',
        margin: 0,
    },
    listItem: {
        color: 'var(--color-text-primary)',
        marginBottom: '0.25rem',
    },

    // Notes section
    notesSection: {
        marginTop: '2rem',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        marginBottom: '1rem',
    },

    // Empty state
    emptyState: {
        backgroundColor: 'var(--color-bg-card)',
        border: '1px dashed var(--color-border)',
        borderRadius: '16px',
        padding: '3rem 2rem',
        textAlign: 'center' as const,
    },
    emptyIcon: {
        fontSize: '2.5rem',
        marginBottom: '0.5rem',
        opacity: 0.5,
    },
    emptyTitle: {
        fontSize: '1.125rem',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        marginBottom: '0.25rem',
    },
    emptyDescription: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.9375rem',
    },

    // Jobs list
    jobsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    jobCard: {
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '1rem',
    },
    jobInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
    },
    jobFilename: {
        fontWeight: 500,
        color: 'var(--color-text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '70%',
    },
    badge: {
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    jobMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    jobDate: {
        fontSize: '0.8125rem',
        color: 'var(--color-text-secondary)',
    },
    jobActions: {
        display: 'flex',
        gap: '0.5rem',
    },
    viewBtn: {
        padding: '0.375rem 1rem',
        background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '0.8125rem',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(20, 184, 166, 0.3)',
    },
    deleteBtn: {
        padding: '0.25rem 0.5rem',
        backgroundColor: 'transparent',
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    jobError: {
        color: '#f87171',
        fontSize: '0.8125rem',
        marginTop: '0.5rem',
    },
};

// Status badge styles
export const statusStyles: Record<string, React.CSSProperties> = {
    pending: { background: '#fbbf24', color: '#000' },
    uploaded: { background: '#60a5fa', color: '#000' },
    processing: { background: '#a78bfa', color: '#000' },
    completed: { background: '#374151', color: '#fff' },
    failed: { background: '#f87171', color: '#000' },
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
