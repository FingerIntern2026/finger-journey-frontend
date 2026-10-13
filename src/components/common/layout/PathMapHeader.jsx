// 역할: 오솔길 지도 화면(PTH_MAP_P01) 전용 헤더 — 상단 배지 + 타이틀 + 진행률.
//       일반 Header와 구조가 달라서(배지) 별도 분리함 (인터페이스 명세서 4.3.2).
//       진행률 바+새싹 아이콘은 CustomProgressIndicator(3.4.9)를 그대로 조합해서 씀
// 사용처: PTH 지도 Feature(PathMap.jsx)
// 담당자: 김재웅
import CustomProgressIndicator from '../custom/CustomProgressIndicator';
import styles from './layout.module.css';

const PathMapHeader = ({
  badgeLabel = '✦ FINGER ONBOARDING',
  title,
  progressLabel = '온보딩 진행 중',
  currentStep,
  totalStep,
}) => {
  return (
    <header className={styles.pathMapHeader}>
      <span className={styles.pathMapBadge}>{badgeLabel}</span>
      <h1 className={styles.pathMapTitle}>{title}</h1>
      <div className={styles.pathMapProgressMeta}>
        <span>{progressLabel}</span>
        <strong>{currentStep}/{totalStep}</strong>
      </div>
      <CustomProgressIndicator
        current={currentStep}
        total={totalStep}
        showBadge={false}
        className={styles.pathMapProgress}
      />
    </header>
  );
};

export default PathMapHeader;
