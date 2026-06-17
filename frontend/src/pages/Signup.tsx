import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await signup(username, email, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <Link to="/" style={styles.backLink}>← Back</Link>
                <div style={styles.header}>
                    <Link to="/" style={styles.logo}>
                        <span style={styles.logoText}>VoiceBrief</span>
                        <span style={styles.logoDot}>.</span>
                    </Link>
                    <h1 style={styles.title}>Create your account</h1>
                    <p style={styles.subtitle}>Start summarizing your voice notes.</p>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            placeholder="johndoe"
                            required
                            minLength={3}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <button type="submit" style={styles.button} disabled={isLoading}>
                        {isLoading ? 'Creating account…' : 'Create account'}
                    </button>
                </form>

                <p style={styles.footer}>
                    Already have an account?{' '}
                    <Link to="/login" style={styles.link}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: 'var(--color-bg-primary)',
    },
    card: {
        width: '100%',
        maxWidth: '360px',
    },
    header: {
        textAlign: 'left' as const,
        marginBottom: '2.5rem',
    },
    logo: {
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '0.2rem',
        marginBottom: '2.5rem',
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
    title: {
        fontSize: '1.75rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--color-text-primary)',
        marginBottom: '0.375rem',
    },
    subtitle: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.9375rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.6875rem',
        fontWeight: 500,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
    },
    input: {
        padding: '0.625rem 0',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--color-border)',
        borderRadius: 0,
        fontSize: '1rem',
        color: 'var(--color-text-primary)',
        outline: 'none',
        transition: 'border-color 0.16s',
    },
    button: {
        padding: '0.875rem',
        backgroundColor: 'var(--color-text-primary)',
        color: '#fff',
        fontSize: '0.875rem',
        fontWeight: 600,
        border: '1px solid var(--color-text-primary)',
        borderRadius: 'var(--radius)',
        marginTop: '0.5rem',
        cursor: 'pointer',
        transition: 'background-color 0.16s',
    },
    error: {
        padding: '0.75rem 0',
        borderTop: '1px solid var(--color-error)',
        borderBottom: '1px solid var(--color-error)',
        color: 'var(--color-error)',
        fontSize: '0.8125rem',
        fontFamily: 'var(--font-mono)',
        marginBottom: '1.5rem',
        textAlign: 'left' as const,
    },
    footer: {
        textAlign: 'left' as const,
        marginTop: '2.5rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--color-border)',
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
    },
    link: {
        color: 'var(--color-accent)',
        fontWeight: 600,
        textDecoration: 'none',
    },
    backLink: {
        display: 'inline-block',
        color: 'var(--color-text-muted)',
        textDecoration: 'none',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        marginBottom: '2.5rem',
    },
};
