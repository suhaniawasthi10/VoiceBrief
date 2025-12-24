import { dashboardStyles as styles } from './styles';

interface HeaderProps {
    username: string;
    onLogout: () => void;
}

/**
 * Dashboard header with logo, username, and logout button
 */
export default function Header({ username, onLogout }: HeaderProps) {
    return (
        <header style={styles.header}>
            <div style={styles.headerContent}>
                <div style={styles.logo}>
                    {/* Teal microphone logo icon */}
                    <div style={styles.logoIconCircle}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" y1="19" x2="12" y2="23" />
                            <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                    </div>
                    <span style={styles.logoText}>VoiceBrief</span>
                </div>
                <div style={styles.userSection}>
                    <span style={styles.userName}>{username}</span>
                    <button onClick={onLogout} style={styles.logoutBtn}>
                        Log out
                    </button>
                </div>
            </div>
        </header>
    );
}
