/**
 * PathMapHeader (오솔길 지도 전용 헤더)
 *
 * 오솔길 지도 화면(PTH_MAP_P01) 전용 헤더 — 상단 배지 + 타이틀 + 진행률.
 * 일반 Header/ContentHeader와 구조가 달라서(배지) 별도 분리함 (인터페이스 명세서 4.3.2).
 * 매니저 확인 후 이번 스코프에 포함되어 구현 대상으로 확정됨.
 *
 * 진행률 바+새싹 아이콘은 CustomProgressIndicator(3.4.9)로 분리돼 있어 그대로
 * 조합해서 씀 — 관리자 진행현황/입사자카드에서도 같은 컴포넌트를 재사용하기 위함.
 *
 * ※ 스타일은 layout.module.css의 CSS Modules 클래스를 사용함
 */
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
