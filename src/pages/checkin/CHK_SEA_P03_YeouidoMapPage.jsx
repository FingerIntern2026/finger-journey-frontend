import CheckinArtwork from './CheckinArtwork';
import BaseButton from '../../components/common/base/BaseButton';
import useNavigationStore from '../../stores/useNavigationStore';
import yeouidoMap from '../../assets/checkin/yeouido-map.png';
import CheckinHeader from './CheckinHeader';
import styles from './checkin.module.css';

export default function YeouidoMapPage() {
  const goBack = useNavigationStore((state) => state.goBack);
  return <main className={`${styles.page} ${styles.mapPage}`}><CheckinHeader progress={94}/><section className={styles.content}><h1 className={`${styles.title} ${styles.center}`}>여의도 포레스트</h1><CheckinArtwork className={`${styles.mapImage} ${styles.yeouidoMapImage}`} src={yeouidoMap} title="여의도 포레스트 좌석 배치도" viewBox="15 17 351 515" width={381} height={532} /></section><BaseButton className={styles.button} onClick={() => goBack()}>뒤로 가기</BaseButton></main>;
}
