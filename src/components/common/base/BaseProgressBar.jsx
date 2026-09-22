// 역할: current/total 값을 받아 진행률 바(막대) UI를 그리는 공통 컴포넌트
// 사용처: ComponentListPage.jsx, CustomProgressIndicator.jsx
// 담당자:

import styles from './base.module.css';

export default function BaseProgressBar({ current, total, className = '' }) {
  const percent = total ? (current / total) * 100 : 0;
  return (
    <div className={`${styles.progressTrack} ${className}`}>
      <div className={styles.progressFill} style={{ width: `${percent}%` }} />
    </div>
  );
}
