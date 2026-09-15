import { forwardRef } from 'react';
import styles from './base.module.css';

const BaseSelect = forwardRef(
  ({ label, options = [], placeholder = '선택하세요', error, className = '', ...rest }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && <label className={styles.inputLabel}>{label}</label>}
        <select
          ref={ref}
          className={`${styles.input} ${className}`}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className={styles.inputErrorText}>{error}</p>}
      </div>
    );
  }
);

BaseSelect.displayName = 'BaseSelect';

export default BaseSelect;