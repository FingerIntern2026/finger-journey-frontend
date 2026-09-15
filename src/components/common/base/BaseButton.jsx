import styles from './base.module.css';

export default function BaseButton({
    label,
    onClick,
    variant = 'primary',
    disabled = false,
    fullWidth = false,
    className = '',
}) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.full : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}