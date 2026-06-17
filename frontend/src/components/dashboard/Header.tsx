import { dashboardStyles as styles } from './styles';

interface HeaderProps {
    username: string;
    onLogout: () => void;
}

/**
 * Dashboard header — wordmark, user, logout. Hairline rule, no chrome.
 */
export default function Header({ username, onLogout }: HeaderProps) {
    return (
        <header style={styles.header}>
            <div style={styles.headerContent}>
                <div style={styles.logo}>
                    <span style={styles.logoText}>VoiceBrief</span>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>.</span>
                </div>
                <div style={styles.userSection}>
                    <span style={styles.avatar}>{username}</span>
                    <button onClick={onLogout} style={styles.logoutBtn}>
                        Log out
                    </button>
                </div>
            </div>
        </header>
    );
}
