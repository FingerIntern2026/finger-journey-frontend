import styles from './base.module.css';

export default function BaseButton({
    label,
    onClick,
    variant = 'primary',
    disabled = false,
    fullWidth = false,
    className = '',
    ...rest // data-trace 같은 임의 속성을 실제 <button> DOM까지 그대로 전달
}) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.full : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {label}
        </button>
    );
}