// 역할: children을 감싸서 카드 형태(테두리/배경) UI를 그리는 공통 컴포넌트
// 사용처: ComponentListPage.jsx, CustomChecklist.jsx, ApiExamplePage.jsx
// 담당자:

import styles from './base.module.css';

function BaseCard({ children, className = '' }) {
    return (
        <div className={`${styles.card} ${className}`}>
            {children}
        </div>
    );
}

export default BaseCard;