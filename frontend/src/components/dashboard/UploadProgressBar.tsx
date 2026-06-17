/**
 * Thin animated progress bar shown during audio upload (0-100%).
 */
export default function UploadProgressBar({ percent }: { percent: number }) {
    return (
        <div style={track}>
            <div style={{ ...fill, width: `${Math.min(Math.max(percent, 0), 100)}%` }} />
        </div>
    );
}

const track: React.CSSProperties = {
    width: '100%',
    height: '2px',
    marginTop: '0.75rem',
    backgroundColor: 'var(--color-border)',
    overflow: 'hidden',
};

const fill: React.CSSProperties = {
    height: '100%',
    backgroundColor: 'var(--color-accent)',
    transition: 'width 0.2s ease',
};
