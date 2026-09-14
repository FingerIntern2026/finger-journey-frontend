import styles from './base.module.css';

export default function BaseProgressBar({ current, total, className = '' }) {
  const percent = total ? (current / total) * 100 : 0;
  return (
    <div className={`${styles.progressTrack} ${className}`}>
      <div className={styles.progressFill} style={{ width: `${percent}%` }} />
    </div>
  );
}
