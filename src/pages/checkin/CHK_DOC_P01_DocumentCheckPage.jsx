import BaseButton from '../../components/common/base/BaseButton';
import { useState } from 'react';
import useNavigationStore from '../../stores/useNavigationStore';
import documentIcon from '../../assets/checkin/document.png';
import waitingBadge from '../../assets/checkin/waiting-badge.png';
import CheckinHeader from './CheckinHeader';
import styles from './checkin.module.css';

export default function DocumentCheckPage() {
  const [submitted, setSubmitted] = useState(false);
  const goForward = useNavigationStore((state) => state.goForward);
  return <main className={`${styles.page} ${styles.docPage}`}>
    <CheckinHeader progress={18} />
    <section className={styles.content}>
      <h1 className={`${styles.title} ${styles.center}`}>서류 제출은 다 하셨나요?</h1>
      <div className={styles.circleIllustration}><img src={documentIcon} alt="입사 서류" /></div>
      <svg className={styles.branchDiagram} viewBox="0 0 300 72" aria-hidden="true"><path d="M150 0V36H42V66M150 36H258V66"/><path d="M34 57L42 66L50 57M250 57L258 66L266 57"/></svg>
      <div className={styles.branchChoices}><div><BaseButton className={styles.branchChoice} onClick={() => setSubmitted(true)}>그럼요<br/>완벽합니다</BaseButton><p className={styles.choiceCaption}>담당자가 확인할 때까지<br/>잠시만 기다려주세요</p></div><div><BaseButton className={styles.branchChoice} onClick={() => setSubmitted(false)}>아직<br/>못 낸 서류가 있어요</BaseButton><p className={styles.choiceCaption}>자리에 함께 계신 담당자님께<br/>바로 말씀드려주세요!</p></div></div>
      <div className={`${styles.center} ${styles.docStatus}`}>{submitted ? <span className={`${styles.statusBadge} ${styles.statusDone}`}>확인 완료</span> : <img className={styles.waitingBadgeImage} src={waitingBadge} alt="대기중" />}</div>
    </section>
    <BaseButton className={styles.button} disabled={!submitted} onClick={() => goForward('CHK_EQU_P01')}>다음</BaseButton>
  </main>;
}
