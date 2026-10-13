import BaseButton from '../../components/common/base/BaseButton';
import useNavigationStore from '../../stores/useNavigationStore';
import confetti from '../../assets/checkin/confetti.png';
import CheckinHeader from '../../components/feature/CHK/common/CheckinHeader';
import styles from './checkin.module.css';

export default function ApprovalIntroPage() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <main className={`${styles.page} ${styles.approvalIntroPage}`}>
    <CheckinHeader progress={66} onBack={goBack} />
    <section className={styles.content}>
      <img className={styles.celebrationArt} src={confetti} alt="" /><div className={styles.approvalIntroMessage}><h1>제일 중요한 시간입니다<br/><strong>&lt;계약서 작성 TIME&gt;</strong></h1></div>
    </section>
    <BaseButton className={styles.button} onClick={() => goForward('CHK_APR_P02')}>다음</BaseButton>
  </main>;
}
