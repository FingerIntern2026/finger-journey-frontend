import { forwardRef } from 'react';

const BaseTextArea = forwardRef(
  ({ label, error, rows = 6, className = '', ...rest }, ref) => {
    return (
      <div className="base-textarea-wrapper">
        {label && <label className="base-textarea-label">{label}</label>}
        <textarea
          ref={ref}
          rows={rows}
          className={`base-textarea ${className}`}
          {...rest}
        />
        {error && <p className="base-textarea-error-text">{error}</p>}
      </div>
    );
  }
);

BaseTextArea.displayName = 'BaseTextArea';

export default BaseTextArea;
