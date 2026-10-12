import BaseButton from '../../components/common/base/BaseButton';
import useNavigationStore from '../../stores/useNavigationStore';
import compass from '../../assets/checkin/compass.png';
import CheckinHeader from './CheckinHeader';
import styles from './checkin.module.css';

export default function OfficeSelectPage() {
  const goForward = useNavigationStore((state) => state.goForward);
  return <main className={`${styles.page} ${styles.officePage}`}>
    <CheckinHeader progress={91} />
    <section className={styles.content}><h1 className={`${styles.title} ${styles.center}`}>자리를 한번 찾아봅시다</h1><div className={styles.circleIllustration}><img src={compass} alt="나침반" /></div><svg className={styles.branchDiagram} viewBox="0 0 300 72" aria-hidden="true"><path d="M150 0V36H42V66M150 36H258V66"/><path d="M34 57L42 66L50 57M250 57L258 66L266 57"/></svg><div className={styles.officeBranch}><BaseButton className={styles.officeButton} onClick={() => goForward('CHK_SEA_P02')}>종로<br/>포레스트</BaseButton><BaseButton className={styles.officeButton} onClick={() => goForward('CHK_SEA_P03')}>여의도<br/>포레스트</BaseButton></div></section>
    <BaseButton className={styles.button} onClick={() => goForward('CHK_FIN_P01')}>다음</BaseButton>
  </main>;
}
