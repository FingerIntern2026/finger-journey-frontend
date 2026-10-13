import CheckinArtwork from '../../components/feature/CHK/common/CheckinArtwork';
import BaseButton from '../../components/common/base/BaseButton';
import useNavigationStore from '../../stores/useNavigationStore';
import journeyFinish from '../../assets/checkin/journey-finish.png';
import onboardingBadge from '../../assets/checkin/onboarding-badge.png';
import styles from './checkin.module.css';

export default function CheckinCompletePage() {
  const goForward = useNavigationStore((state) => state.goForward);
  return <main className={`${styles.page} ${styles.finishPage}`}><section className={styles.content}><img className={styles.onboardingBadge} src={onboardingBadge} alt="FINGER ONBOARDING" /><h1 className={styles.title}>가방을 다 쌌어요!<br/>이제 직접 걸어볼 차례예요<br/>오솔길을 향해 가볼까요?</h1><CheckinArtwork className={styles.finishImage} src={journeyFinish} title="오솔길을 걷는 신입사원" viewBox="24 216 343 445" width={393} height={852} /></section><BaseButton className={styles.button} onClick={() => goForward('PTH_MAP_P01')}>오솔길로 가기</BaseButton></main>;
}
