import BaseProgressBar from '../../components/common/base/BaseProgressBar';
import BaseButton from '../../components/common/base/BaseButton';
import useNavigationStore from '../../stores/useNavigationStore';
import sprout from '../../assets/checkin/sprout.png';
import styles from './checkin.module.css';

export default function CheckinHeader({ progress = 0 }) {
  const goBack = useNavigationStore((state) => state.goBack);
  return <header className={styles.journeyHeader}>
    <span className={styles.headerLabel}>가방 싸는 중</span>
    <BaseButton type="button" className={styles.headerBack} onClick={() => goBack()} aria-label="뒤로 가기">‹</BaseButton>
    <BaseProgressBar current={progress} total={100} className={styles.headerProgress} />
    <img src={sprout} alt="" className={styles.headerSprout} />
  </header>;
}
