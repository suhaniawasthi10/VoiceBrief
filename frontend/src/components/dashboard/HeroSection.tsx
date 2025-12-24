import { dashboardStyles as styles } from './styles';

/**
 * Hero section with main title and subtitle
 */
export default function HeroSection() {
    return (
        <section style={styles.heroSection}>
            <h1 style={styles.heroTitle}>
                Transform Your Voice Notes into Summaries
            </h1>
            <p style={styles.heroSubtitle}>
                Record or upload audio files and get instant AI-powered summaries with key points and action items
            </p>
        </section>
    );
}
