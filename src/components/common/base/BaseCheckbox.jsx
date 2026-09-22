// 역할: checked/onChange를 받아 체크박스 UI를 그리는 공통 컴포넌트. 키보드(Space/Enter)로도 토글 가능하도록 처리
// 사용처: ComponentListPage.jsx, CustomChecklist.jsx
// 담당자:

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