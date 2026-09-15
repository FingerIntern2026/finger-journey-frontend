import { forwardRef } from 'react';
import styles from './base.module.css';

const BaseInput = forwardRef(
  ({ label, error, type = 'text', className = '', ...rest }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && <label className={styles.inputLabel}>{label}</label>}
        <input
          ref={ref}
          type={type}
          className={`${styles.input} ${className}`}
          {...rest}
        />
        {error && <p className={styles.inputErrorText}>{error}</p>}
      </div>
    );
  }
);

BaseInput.displayName = 'BaseInput';

export default BaseInput;
