import BaseButton from '../../../common/base/BaseButton';
import compass from '../../../../assets/checkin/compass.png';
import CheckinHeader from '../common/CheckinHeader';
import styles from './SeatGuide.module.css';

export default function OfficeSelect({ onBack, onSelectJongno, onSelectYeouido, onNext }) {
  return (
    <main className={styles.page}>
      <CheckinHeader progress={91} onBack={onBack} />
      <section className={styles.content}>
        <h1 className={styles.title}>자리를 한번 찾아봅시다</h1>
        <div className={styles.illustration}><img src={compass} alt="나침반" /></div>
        <svg className={styles.branchDiagram} viewBox="0 0 300 72" aria-hidden="true">
          <path d="M150 0V36H42V66M150 36H258V66" />
          <path d="M34 57L42 66L50 57M250 57L258 66L266 57" />
        </svg>
        <div className={styles.officeBranch}>
          <BaseButton className={styles.officeButton} onClick={onSelectJongno}>종로<br />포레스트</BaseButton>
          <BaseButton className={styles.officeButton} onClick={onSelectYeouido}>여의도<br />포레스트</BaseButton>
        </div>
      </section>
      <BaseButton className={styles.nextButton} onClick={onNext}>다음</BaseButton>
    </main>
  );
}
