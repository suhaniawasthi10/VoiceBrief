import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <Link to="/" style={styles.logo}>
                        <span style={styles.logoIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" y1="19" x2="12" y2="23" />
                                <line x1="8" y1="23" x2="16" y2="23" />
                            </svg>
                        </span>
                        <span style={styles.logoText}>VoiceBrief</span>
                    </Link>
                    <h1 style={styles.title}>Welcome back</h1>
                    <p style={styles.subtitle}>Sign in to continue to your account</p>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
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
                        />
                    </div>

                    <button type="submit" style={styles.button} disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={styles.footer}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={styles.link}>
                        Sign up
                    </Link>
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
        background: 'radial-gradient(ellipse at top, rgba(20, 184, 166, 0.08) 0%, transparent 50%)',
    },
    card: {
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '24px',
        padding: '3rem',
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '2rem',
    },
    logo: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        marginBottom: '1.5rem',
    },
    logoIcon: {
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
    title: {
        fontSize: '1.75rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        marginBottom: '0.5rem',
    },
    subtitle: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.9375rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.25rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'var(--color-text-secondary)',
    },
    input: {
        padding: '0.875rem 1rem',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        fontSize: '1rem',
        color: 'var(--color-text-primary)',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    button: {
        padding: '1rem',
        background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 600,
        borderRadius: '12px',
        marginTop: '0.5rem',
        boxShadow: '0 4px 15px rgba(20, 184, 166, 0.25)',
        transition: 'transform 0.2s',
    },
    error: {
        padding: '0.875rem 1rem',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '12px',
        color: '#ef4444',
        fontSize: '0.875rem',
        marginBottom: '1rem',
        textAlign: 'center' as const,
    },
    footer: {
        textAlign: 'center' as const,
        marginTop: '2rem',
        color: 'var(--color-text-secondary)',
        fontSize: '0.9375rem',
    },
    link: {
        color: '#14b8a6',
        fontWeight: 500,
        textDecoration: 'none',
    },
};
