import { useState } from 'react';
import BaseButton from '../../../common/base/BaseButton';
import CheckinStatus from '../common/CheckinStatus';
import CheckinHeader from '../common/CheckinHeader';
import styles from './Approval.module.css';

export default function ApprovalComplete({ onBack, onNext }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <main className={styles.page}>
      <CheckinHeader progress={83} onBack={onBack} />
      <section className={styles.content}>
        <div className={styles.waitingArea}>
          <div className={styles.waitingMessage}>다 하셨으면<br />HR 담당자님께 확인 받아주세요!</div>
          <BaseButton className={styles.confirmButton} onClick={() => setConfirmed(true)}>
            <CheckinStatus complete={confirmed} />
          </BaseButton>
        </div>
      </section>
      <BaseButton className={styles.nextButton} onClick={onNext}>다음</BaseButton>
    </main>
  );
}
