import BaseButton from '../../../common/base/BaseButton';
import journeyFinish from '../../../../assets/checkin/journey-finish.png';
import onboardingBadge from '../../../../assets/checkin/onboarding-badge.png';
import CheckinArtwork from '../common/CheckinArtwork';
import styles from './CheckinComplete.module.css';

export default function CheckinComplete({ onComplete }) {
  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <img className={styles.badge} src={onboardingBadge} alt="FINGER ONBOARDING" />
        <h1 className={styles.title}>
          가방을 다 쌌어요!
          <br />
          이제 직접 걸어볼 차례예요
          <br />
          오솔길을 향해 가볼까요?
        </h1>
        <CheckinArtwork
          className={styles.finishImage}
          src={journeyFinish}
          title="오솔길을 걷는 신입사원"
          viewBox="24 216 343 445"
          width={393}
          height={852}
        />
      </section>
      <BaseButton className={styles.completeButton} onClick={onComplete}>오솔길로 가기</BaseButton>
    </main>
  );
}
