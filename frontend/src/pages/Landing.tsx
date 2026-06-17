import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Quick recording',
            description: 'Record voice notes instantly in the browser. No setup required.',
        },
        {
            title: 'File upload',
            description: 'Upload existing audio and summarize recordings from any source.',
        },
        {
            title: 'AI transcription',
            description: 'Accurate speech-to-text, with automatic language detection.',
        },
        {
            title: 'Structured summaries',
            description: 'Title, summary, key points, and action items — extracted for you.',
        },
        {
            title: 'Long-form ready',
            description: 'Map-reduce summarization handles lengthy recordings cleanly.',
        },
        {
            title: 'Save time',
            description: 'Get the gist in seconds instead of replaying the whole thing.',
        },
    ];

    return (
        <div style={styles.page}>
            {/* Navigation */}
            <nav style={styles.nav}>
                <div style={styles.navContainer}>
                    <div style={styles.logo}>
                        <span style={styles.logoText}>VoiceBrief</span>
                        <span style={styles.logoDot}>.</span>
                    </div>
                    <div style={styles.navButtons}>
                        <button onClick={() => navigate('/login')} style={styles.loginBtn}>
                            Log in
                        </button>
                        <button onClick={() => navigate('/signup')} style={styles.signupBtn}>
                            Get started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section style={styles.hero}>
                <p style={styles.kicker}>AI voice-note summarizer</p>
                <h1 style={styles.heroTitle}>
                    Voice notes,<br />
                    turned into <span style={styles.accent}>summaries</span>.
                </h1>
                <p style={styles.heroSubtitle}>
                    Record or upload audio and get a clean transcript with key points and
                    action items — in seconds.
                </p>
                <div style={styles.heroCta}>
                    <button onClick={() => navigate('/signup')} style={styles.primaryBtn}>
                        Get started
                    </button>
                    <button
                        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                        style={styles.secondaryBtn}
                    >
                        Learn more
                    </button>
                </div>
            </section>

            {/* Features — editorial index */}
            <section id="features" style={styles.features}>
                <p style={styles.sectionLabel}>What it does</p>
                <div style={styles.featuresList}>
                    {features.map((feature, index) => (
                        <div key={index} style={styles.featureRow}>
                            <span style={styles.featureIndex}>
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 style={styles.featureTitle}>{feature.title}</h3>
                            <p style={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={styles.ctaSection}>
                <h2 style={styles.ctaTitle}>Ready to get started?</h2>
                <button onClick={() => navigate('/signup')} style={styles.primaryBtn}>
                    Create an account
                </button>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <span style={styles.footerText}>VoiceBrief</span>
                <span style={styles.footerText}>© 2026</span>
            </footer>
        </div>
    );
}

const MAXW = '960px';

const styles: { [key: string]: React.CSSProperties } = {
    page: {
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
    },

    // Navigation
    nav: {
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border)',
    },
    navContainer: {
        maxWidth: MAXW,
        margin: '0 auto',
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.2rem',
    },
    logoText: {
        fontSize: '1.0625rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--color-text-primary)',
    },
    logoDot: {
        color: 'var(--color-accent)',
        fontWeight: 700,
    },
    navButtons: {
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center',
    },
    loginBtn: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
    },
    signupBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--color-text-primary)',
        color: '#fff',
        fontSize: '0.75rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius)',
    },

    // Hero
    hero: {
        maxWidth: MAXW,
        margin: '0 auto',
        padding: '7rem 2rem 5rem',
        borderBottom: '1px solid var(--color-border)',
    },
    kicker: {
        fontSize: '0.6875rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        marginBottom: '1.5rem',
    },
    heroTitle: {
        fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
        fontWeight: 700,
        lineHeight: 1.02,
        letterSpacing: '-0.035em',
        marginBottom: '1.5rem',
        color: 'var(--color-text-primary)',
    },
    accent: {
        color: 'var(--color-accent)',
    },
    heroSubtitle: {
        fontSize: '1.0625rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.5,
        marginBottom: '2.5rem',
        maxWidth: '46ch',
    },
    heroCta: {
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap' as const,
    },
    primaryBtn: {
        padding: '0.75rem 1.5rem',
        backgroundColor: 'var(--color-text-primary)',
        color: '#fff',
        fontSize: '0.875rem',
        fontWeight: 600,
        border: '1px solid var(--color-text-primary)',
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
        transition: 'background-color 0.16s',
    },
    secondaryBtn: {
        padding: '0.75rem 1.5rem',
        background: 'transparent',
        color: 'var(--color-text-primary)',
        fontSize: '0.875rem',
        fontWeight: 500,
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
        transition: 'border-color 0.16s',
    },

    // Features
    features: {
        maxWidth: MAXW,
        margin: '0 auto',
        padding: '5rem 2rem',
    },
    sectionLabel: {
        fontSize: '0.6875rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        marginBottom: '2.5rem',
    },
    featuresList: {
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid var(--color-border)',
    },
    featureRow: {
        display: 'grid',
        gridTemplateColumns: '3rem 1fr 1.4fr',
        gap: '1.5rem',
        alignItems: 'baseline',
        padding: '1.75rem 0',
        borderBottom: '1px solid var(--color-border)',
    },
    featureIndex: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
    },
    featureTitle: {
        fontSize: '1.0625rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: 'var(--color-text-primary)',
    },
    featureDescription: {
        fontSize: '0.9375rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.5,
    },

    // CTA
    ctaSection: {
        maxWidth: MAXW,
        margin: '0 auto',
        padding: '5rem 2rem 6rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '2rem',
    },
    ctaTitle: {
        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: 'var(--color-text-primary)',
    },

    // Footer
    footer: {
        maxWidth: MAXW,
        margin: '0 auto',
        padding: '2rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
    },
    footerText: {
        color: 'var(--color-text-muted)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
    },
};
