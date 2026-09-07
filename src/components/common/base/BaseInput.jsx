import { forwardRef } from 'react';

const BaseInput = forwardRef(
  ({ label, error, type = 'text', className = '', ...rest }, ref) => {
    return (
      <div className="base-input-wrapper">
        {label && <label className="base-input-label">{label}</label>}
        <input
          ref={ref}
          type={type}
          className={`base-input ${className}`}
          {...rest}
        />
        {error && <p className="base-input-error-text">{error}</p>}
      </div>
    );
  }
);

BaseInput.displayName = 'BaseInput';

export default BaseInput;
