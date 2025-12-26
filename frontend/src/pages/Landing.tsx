import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    const features = [
        {
            icon: '🎙️',
            title: 'Quick Recording',
            description: 'Record voice notes instantly with our intuitive interface. No setup required.',
        },
        {
            icon: '📤',
            title: 'File Upload',
            description: 'Upload existing audio files and get summaries for recordings from any source.',
        },
        {
            icon: '⚡',
            title: 'AI-Powered',
            description: 'Advanced AI analyzes your notes and extracts key information automatically.',
        },
        {
            icon: '⏱️',
            title: 'Save Time',
            description: 'Get summaries in seconds instead of listening to lengthy recordings.',
        },
        {
            icon: '📝',
            title: 'Smart Summaries',
            description: 'Get structured summaries with key points, action items, and important details.',
        },
        {
            icon: '🚀',
            title: 'Take Action',
            description: 'Identify action items and next steps automatically from your voice notes.',
        },
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
            {/* Navigation */}
            <nav style={styles.nav}>
                <div style={styles.navContainer}>
                    <div style={styles.logo}>
                        <div style={styles.logoIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" y1="19" x2="12" y2="23" />
                                <line x1="8" y1="23" x2="16" y2="23" />
                            </svg>
                        </div>
                        <span style={styles.logoText}>VoiceBrief</span>
                    </div>
                    <div style={styles.navButtons}>
                        <button onClick={() => navigate('/login')} style={styles.loginBtn}>
                            Log In
                        </button>
                        <button onClick={() => navigate('/signup')} style={styles.signupBtn} className="btn-primary-hover">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        Transform Voice Notes
                        <br />
                        into <span style={styles.gradientText}>Actionable Summaries</span>
                    </h1>
                    <p style={styles.heroSubtitle}>
                        Record or upload your voice notes and get AI-powered summaries with key points,
                        action items, and insights in seconds.
                    </p>
                    <div style={styles.heroCta}>
                        <button onClick={() => navigate('/signup')} style={styles.primaryBtn} className="btn-primary-hover">
                            Get Started →
                        </button>
                        <button
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                            style={styles.secondaryBtn}
                            className="btn-secondary-hover"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" style={styles.features}>
                <div style={styles.featuresContainer}>
                    <h2 style={styles.featuresTitle}>
                        Everything you need to manage voice notes
                    </h2>
                    <div style={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} style={styles.featureCard}>
                                <div style={styles.featureIcon}>{feature.icon}</div>
                                <h3 style={styles.featureTitle}>{feature.title}</h3>
                                <p style={styles.featureDescription}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={styles.ctaSection}>
                <div style={styles.ctaContainer}>
                    <div style={styles.ctaCard}>
                        <h2 style={styles.ctaTitle}>Ready to get started?</h2>
                        <p style={styles.ctaSubtitle}>
                            Join thousands of professionals who use VoiceBrief to stay organized and productive.
                        </p>
                        <button onClick={() => navigate('/signup')} style={styles.ctaBtn} className="btn-primary-hover">
                            Get Started →
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2025 VoiceBrief. All rights reserved.</p>
            </footer>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    // Navigation
    nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
    },
    navContainer: {
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
        gap: '0.75rem',
    },
    logoIcon: {
        width: '44px',
        height: '44px',
        background: 'rgba(20, 184, 166, 0.15)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
    },
    navButtons: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },
    loginBtn: {
        padding: '0.625rem 1.25rem',
        color: 'var(--color-text-secondary)',
        fontSize: '0.9375rem',
        fontWeight: 500,
        transition: 'color 0.2s',
    },
    signupBtn: {
        padding: '0.625rem 1.5rem',
        background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
        color: '#fff',
        fontSize: '0.9375rem',
        fontWeight: 600,
        borderRadius: '10px',
        transition: 'transform 0.2s',
    },

    // Hero
    hero: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80px',
        paddingBottom: '40px',
    },
    heroContent: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 2rem',
        textAlign: 'center' as const,
    },
    heroTitle: {
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: '1.5rem',
        color: 'var(--color-text-primary)',
    },
    gradientText: {
        background: 'linear-gradient(135deg, #14b8a6, #0d9488, #2dd4bf)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    heroSubtitle: {
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.7,
        marginBottom: '2.5rem',
        maxWidth: '650px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    heroCta: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap' as const,
    },
    primaryBtn: {
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 600,
        borderRadius: '12px',
        transition: 'transform 0.2s',
    },
    secondaryBtn: {
        padding: '1rem 2rem',
        background: 'transparent',
        color: 'var(--color-text-primary)',
        fontSize: '1rem',
        fontWeight: 500,
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        transition: 'border-color 0.2s',
    },

    // Features
    features: {
        padding: '100px 0',
    },
    featuresContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
    },
    featuresTitle: {
        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        fontWeight: 700,
        textAlign: 'center' as const,
        marginBottom: '4rem',
        color: 'var(--color-text-primary)',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    },
    featureCard: {
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '20px',
        padding: '2.5rem',
        transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
    },
    featureIcon: {
        fontSize: '2.5rem',
        marginBottom: '1.25rem',
        width: '64px',
        height: '64px',
        background: 'rgba(20, 184, 166, 0.15)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '0.75rem',
        color: 'var(--color-text-primary)',
    },
    featureDescription: {
        fontSize: '0.9375rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
    },

    // CTA
    ctaSection: {
        padding: '100px 0',
    },
    ctaContainer: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 2rem',
    },
    ctaCard: {
        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(13, 148, 136, 0.1))',
        border: '1px solid rgba(20, 184, 166, 0.2)',
        borderRadius: '32px',
        padding: '4rem 3rem',
        textAlign: 'center' as const,
    },
    ctaTitle: {
        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
        fontWeight: 700,
        marginBottom: '1rem',
        color: 'var(--color-text-primary)',
    },
    ctaSubtitle: {
        fontSize: '1.125rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '2rem',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    ctaBtn: {
        padding: '1rem 2.5rem',
        background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 600,
        borderRadius: '12px',
        transition: 'transform 0.2s',
    },

    // Footer
    footer: {
        padding: '2rem',
        borderTop: '1px solid var(--color-border)',
        textAlign: 'center' as const,
    },
    footerText: {
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
    },
};
