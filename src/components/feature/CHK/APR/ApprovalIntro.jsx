import BaseButton from '../../../common/base/BaseButton';
import confetti from '../../../../assets/checkin/confetti.png';
import CheckinHeader from '../common/CheckinHeader';
import styles from './Approval.module.css';

export default function ApprovalIntro({ onBack, onNext }) {
  return (
    <main className={`${styles.page} ${styles.introPage}`}>
      <CheckinHeader progress={66} onBack={onBack} />
      <section className={styles.introContent}>
        <img className={styles.celebrationArt} src={confetti} alt="" />
        <div className={styles.introMessage}>
          <h1>제일 중요한 시간입니다<br /><strong>&lt;계약서 작성 TIME&gt;</strong></h1>
        </div>
      </section>
      <BaseButton className={styles.nextButton} onClick={onNext}>다음</BaseButton>
    </main>
  );
}
