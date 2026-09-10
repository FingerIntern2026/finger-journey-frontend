import styles from './base.module.css';

function BaseCheckbox({ checked, onChange, className = '' }) {
    return (
        <div
            role="checkbox"
            aria-checked={checked}
            onClick={onChange}
            className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''} ${className}`}
        >
            {checked ? "✓" : ""}
        </div>
    );
}

export default BaseCheckbox;