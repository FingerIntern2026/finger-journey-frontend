import { forwardRef } from 'react';
import styles from './base.module.css';

const BaseTextArea = forwardRef(
  ({ label, error, rows = 6, className = '', ...rest }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && <label className={styles.inputLabel}>{label}</label>}
        <textarea
          ref={ref}
          rows={rows}
          className={`${styles.input} ${className}`}
          {...rest}
        />
        {error && <p className={styles.inputErrorText}>{error}</p>}
      </div>
    );
  }
);

BaseTextArea.displayName = 'BaseTextArea';

export default BaseTextArea;
