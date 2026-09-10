import styles from './base.module.css';

export default function BaseBadge({ label, color = 'gray', className = '' }) {
    return (
        <span className={`${styles.badge} ${styles[color]} ${className}`}>
            {label}
        </span>
    );
}