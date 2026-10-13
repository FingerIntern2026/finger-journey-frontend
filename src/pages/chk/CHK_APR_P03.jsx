import BaseButton from '../../components/common/base/BaseButton';
import { useState } from 'react';
import useNavigationStore from '../../stores/useNavigationStore';
import CheckinHeader from '../../components/feature/CHK/common/CheckinHeader';
import waitingBadge from '../../assets/checkin/waiting-badge.png';
import styles from './checkin.module.css';

export default function ApprovalCompletePage() {
  const [confirmed, setConfirmed] = useState(false);
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <main className={`${styles.page} ${styles.approvalCompletePage}`}>
    <CheckinHeader progress={83} onBack={goBack} />
    <section className={styles.content}><div className={styles.waitingArea}><div className={styles.waitingMessage}>다 하셨으면<br/>HR 담당자님께 확인 받아주세요!</div><BaseButton className={styles.waitingBadgeButton} onClick={() => setConfirmed(true)}>{confirmed ? <span className={`${styles.statusBadge} ${styles.statusDone}`}>확인 완료</span> : <img className={styles.waitingBadgeImage} src={waitingBadge} alt="대기중" />}</BaseButton></div></section>
    <BaseButton className={styles.button} onClick={() => goForward('CHK_SEA_P01')}>다음</BaseButton>
  </main>;
}
