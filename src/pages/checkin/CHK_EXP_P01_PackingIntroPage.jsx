import BaseButton from '../../components/common/base/BaseButton';
import useNavigationStore from '../../stores/useNavigationStore';
import packingIntro from '../../assets/checkin/packing-intro.png';
import onboardingBadge from '../../assets/checkin/onboarding-badge.png';
import styles from './checkin.module.css';

export default function PackingIntroPage() {
  const goForward = useNavigationStore((state) => state.goForward);
  return <main className={`${styles.page} ${styles.expPage}`}>
    <section className={styles.content}>
      <img className={styles.onboardingBadge} src={onboardingBadge} alt="FINGER ONBOARDING" />
      <h1 className={styles.expTitle}>가방을 챙겨 볼까요?</h1>
      <img className={styles.expImage} src={packingIntro} alt="가방을 챙기는 준비물 일러스트" />
      <p className={styles.expDescription}>오솔길을 걷기 전에<br/>함께 가방을 싸며 여정을 준비해봐요<br/>가장 중요한 것들이니 하나도 빼먹지 말기로 해요</p>
    </section>
    <BaseButton className={`${styles.button} ${styles.expButton}`} onClick={() => goForward('CHK_DOC_P01')}>가방 챙기러 가기</BaseButton>
  </main>;
}
