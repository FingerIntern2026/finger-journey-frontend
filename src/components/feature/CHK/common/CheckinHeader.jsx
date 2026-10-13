import BaseButton from '../../../common/base/BaseButton';
import BaseProgressBar from '../../../common/base/BaseProgressBar';
import sprout from '../../../../assets/checkin/sprout.png';
import styles from './CheckinHeader.module.css';

export default function CheckinHeader({ progress = 0, onBack }) {
  return (
    <header className={styles.header}>
      <span className={styles.label}>가방 싸는 중</span>
      <BaseButton type="button" className={styles.backButton} onClick={onBack} aria-label="뒤로 가기">
        ‹
      </BaseButton>
      <BaseProgressBar current={progress} total={100} className={styles.progress} />
      <img src={sprout} alt="" className={styles.sprout} />
    </header>
  );
}
