// 역할: label/error/type 등을 받아 input 필드 UI를 그리는 공통 컴포넌트. forwardRef로 ref 전달 지원
// 사용처: ComponentListPage.jsx, ReportExamplePage.jsx, CustomAuthForm.jsx, ApiExamplePage.jsx
// 담당자:

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
