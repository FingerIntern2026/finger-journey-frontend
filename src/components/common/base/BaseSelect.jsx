import { forwardRef } from 'react';

const BaseSelect = forwardRef(
  ({ label, options = [], placeholder = '선택하세요', error, className = '', ...rest }, ref) => {
    return (
      <div className="base-select-wrapper">
        {label && <label className="base-select-label">{label}</label>}
        <select
          ref={ref}
          className={`base-select ${className}`}
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
        {error && <p className="base-select-error-text">{error}</p>}
      </div>
    );
  }
);

BaseSelect.displayName = 'BaseSelect';

export default BaseSelect;