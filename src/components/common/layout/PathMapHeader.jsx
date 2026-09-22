// 역할: 오솔길 지도 화면(PTH_MAP_P01) 전용 헤더 — 상단 배지 + 타이틀 + 진행률.
//       일반 Header와 구조가 달라서(배지) 별도 분리함 (인터페이스 명세서 4.3.2).
//       진행률 바+새싹 아이콘은 CustomProgressIndicator(3.4.9)를 그대로 조합해서 씀
// 사용처: ComponentListPage.jsx (컴포넌트 데모)
// 담당자:
import CustomProgressIndicator from '../custom/CustomProgressIndicator';
import styles from './layout.module.css';

const PathMapHeader = ({ badgeLabel = 'FINGER ONBOARDING', title, currentStep, totalStep }) => {
  return (
    <div className={styles.pathMapHeader}>
      <span className={styles.pathMapBadge}>{badgeLabel}</span>
      <span className={styles.pathMapTitle}>{title}</span>
      <CustomProgressIndicator current={currentStep} total={totalStep} className={styles.pathMapProgress} />
    </div>
  );
};

export default PathMapHeader;
