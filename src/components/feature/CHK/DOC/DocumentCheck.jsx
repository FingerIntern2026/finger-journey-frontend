import { useState } from 'react';
import BaseButton from '../../../common/base/BaseButton';
import documentIcon from '../../../../assets/checkin/document.png';
import waitingBadge from '../../../../assets/checkin/waiting-badge.png';
import CheckinHeader from '../common/CheckinHeader';
import styles from './DocumentCheck.module.css';

export default function DocumentCheck({ onBack, onNext }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className={styles.page}>
      <CheckinHeader progress={18} onBack={onBack} />
      <section className={styles.content}>
        <h1 className={styles.title}>서류 제출은 다 하셨나요?</h1>
        <div className={styles.illustration}>
          <img src={documentIcon} alt="입사 서류" />
        </div>
        <svg className={styles.branchDiagram} viewBox="0 0 300 72" aria-hidden="true">
          <path d="M150 0V36H42V66M150 36H258V66" />
          <path d="M34 57L42 66L50 57M250 57L258 66L266 57" />
        </svg>
        <div className={styles.choices}>
          <div>
            <BaseButton className={styles.choice} onClick={() => setSubmitted(true)}>
              그럼요
              <br />
              완벽합니다
            </BaseButton>
            <p className={styles.caption}>담당자가 확인할 때까지<br />잠시만 기다려주세요</p>
          </div>
          <div>
            <BaseButton className={styles.choice} onClick={() => setSubmitted(false)}>
              아직
              <br />
              못 낸 서류가 있어요
            </BaseButton>
            <p className={styles.caption}>자리에 함께 계신 담당자님께<br />바로 말씀드려주세요!</p>
          </div>
        </div>
        <div className={styles.status}>
          {submitted ? (
            <span className={styles.done}>확인 완료</span>
          ) : (
            <img className={styles.waitingBadge} src={waitingBadge} alt="대기중" />
          )}
        </div>
      </section>
      <BaseButton className={styles.nextButton} onClick={onNext}>다음</BaseButton>
    </main>
  );
}
