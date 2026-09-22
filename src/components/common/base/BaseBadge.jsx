// 역할: label과 color(팔레트 키)를 받아 뱃지(작은 라벨) UI를 그리는 공통 컴포넌트
// 사용처: ComponentListPage.jsx, CustomProgressIndicator.jsx, AuthCheckPage.jsx
// 담당자:

import styles from './base.module.css';

export default function BaseBadge({ label, color = 'gray', className = '' }) {
    return (
        <span className={`${styles.badge} ${styles[color]} ${className}`}>
            {label}
        </span>
    );
}