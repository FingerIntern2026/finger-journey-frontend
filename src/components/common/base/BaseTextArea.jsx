// 역할: label/rows 등을 받아 textarea UI를 그리는 공통 컴포넌트. forwardRef로 ref 전달 지원
// 사용처: ComponentListPage.jsx
// 담당자:

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
