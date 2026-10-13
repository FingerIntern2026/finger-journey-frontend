import CheckinArtwork from './CheckinArtwork';
import BaseButton from '../../components/common/base/BaseButton';
import useNavigationStore from '../../stores/useNavigationStore';
import jongnoMap from '../../assets/checkin/jongno-map.png';
import CheckinHeader from './CheckinHeader';
import styles from './checkin.module.css';

export default function JongnoMapPage() {
  const goBack = useNavigationStore((state) => state.goBack);
  return <main className={`${styles.page} ${styles.mapPage}`}><CheckinHeader progress={94}/><section className={styles.content}><h1 className={`${styles.title} ${styles.center}`}>종로 포레스트</h1><CheckinArtwork className={styles.mapImage} src={jongnoMap} title="종로 포레스트 좌석 배치도" viewBox="30 8 348 491" width={459} height={499} /></section><BaseButton className={styles.button} onClick={() => goBack()}>뒤로 가기</BaseButton></main>;
}
