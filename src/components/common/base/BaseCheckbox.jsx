import styles from './base.module.css';

function BaseCheckbox({ checked, onChange, className = '' }) {
    // role="checkbox"를 쓰는 이상 키보드로도 포커스/토글이 가능해야 함
    // (마우스 클릭만 지원하면 스크린리더/키보드 사용자가 조작 불가)
    const handleKeyDown = (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(e);
        }
    };

    return (
        <div
            role="checkbox"
            aria-checked={checked}
            tabIndex={0}
            onClick={onChange}
            onKeyDown={handleKeyDown}
            className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''} ${className}`}
        >
            {checked ? "✓" : ""}
        </div>
    );
}

export default BaseCheckbox;