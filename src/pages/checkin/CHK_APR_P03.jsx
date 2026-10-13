import BaseButton from '../../components/common/base/BaseButton';
import { useState } from 'react';
import useNavigationStore from '../../stores/useNavigationStore';
import CheckinHeader from './CheckinHeader';
import waitingBadge from '../../assets/checkin/waiting-badge.png';
import styles from './checkin.module.css';

export default function ApprovalCompletePage() {
  const [confirmed, setConfirmed] = useState(false);
  const goForward = useNavigationStore((state) => state.goForward);
  return <main className={`${styles.page} ${styles.approvalCompletePage}`}>
    <CheckinHeader progress={83} />
    <section className={styles.content}><div className={styles.waitingArea}><div className={styles.waitingMessage}>다 하셨으면<br/>HR 담당자님께 확인 받아주세요!</div><BaseButton className={styles.waitingBadgeButton} onClick={() => setConfirmed(true)}>{confirmed ? <span className={`${styles.statusBadge} ${styles.statusDone}`}>확인 완료</span> : <img className={styles.waitingBadgeImage} src={waitingBadge} alt="대기중" />}</BaseButton></div></section>
    <BaseButton className={styles.button} disabled={!confirmed} onClick={() => goForward('CHK_SEA_P01')}>다음</BaseButton>
  </main>;
}
