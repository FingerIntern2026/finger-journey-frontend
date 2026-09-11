/**
 * CustomProgressIndicator (인터페이스 명세서 3.4.9)
 *
 * 진행률바+배지 — 오솔길 헤더, 관리자 진행현황, 입사자카드에서 공통으로 씀.
 * BaseProgressBar(3.1.9)를 내부적으로 재사용하고, 새싹 아이콘 + 배지(현재/전체
 * 단계)를 덧붙임 — Header.jsx가 자체적으로 갖고 있던 진행률 로직을 분리한 것.
 */
import BaseProgressBar from '../base/BaseProgressBar';
import BaseBadge from '../base/BaseBadge';
import styles from './custom.module.css';

const CustomProgressIndicator = ({ current, total, showBadge = true, className = '' }) => {
  return (
    <div className={`${styles.progressIndicator} ${className}`}>
      {showBadge && <BaseBadge label={`${current}/${total}`} color="gray" />}
      <BaseProgressBar current={current} total={total} className={styles.progressIndicatorBar} />
      <img src="/icons/sprout.svg" alt="새싹" className={styles.progressIndicatorIcon} />
    </div>
  );
};

export default CustomProgressIndicator;
