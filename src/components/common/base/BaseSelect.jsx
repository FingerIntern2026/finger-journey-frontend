// 역할: label/options/placeholder 등을 받아 select(드롭다운) UI를 그리는 공통 컴포넌트. forwardRef로 ref 전달 지원
// 사용처: ComponentListPage.jsx
// 담당자:

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