/**
 * PathMapHeader (오솔길 지도 전용 헤더)
 *
 * 오솔길 지도 화면(PTH_MAP_P01) 전용 헤더 — 상단 배지 + 타이틀 + 진행 단계.
 * 일반 Header/ContentHeader와 구조가 달라서(배지) 별도 분리함 (인터페이스 명세서 4.3.2).
 * 매니저 확인 후 이번 스코프에 포함되어 구현 대상으로 확정됨.
 *
 * ※ 스타일은 layout.module.css의 CSS Modules 클래스를 사용함
 */
import styles from './layout.module.css';

const PathMapHeader = ({ badgeLabel = 'FINGER ONBOARDING', title, currentStep, totalStep }) => {
  return (
    <div className={styles.pathMapHeader}>
      <span className={styles.pathMapBadge}>{badgeLabel}</span>
      <span className={styles.pathMapTitle}>{title}</span>
      <span className={styles.pathMapStep}>{currentStep}/{totalStep}</span>
    </div>
  );
};

export default PathMapHeader;
