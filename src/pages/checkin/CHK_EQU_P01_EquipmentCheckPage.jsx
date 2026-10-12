import CustomChecklist from '../../components/common/custom/CustomChecklist';
import BaseButton from '../../components/common/base/BaseButton';
import monitorIcon from '../../assets/checkin/monitor.png';
import mouseIcon from '../../assets/checkin/mouse.png';
import general from '../../assets/checkin/general.png';
import waitingBadge from '../../assets/checkin/waiting-badge.png';
import CheckinHeader from './CheckinHeader';
import styles from './checkin.module.css';

const items = [
  { id: 'body', label: '외관 및 부속품 확인' },
  { id: 'wifi', label: '와이파이 연결' },
  { id: 'reset', label: '초기화 여부' },
];

export default function EquipmentCheckPage() {
  return <main className={`${styles.page} ${styles.equPage}`}>
    <CheckinHeader progress={34} />
    <section className={styles.content}>
      <h1 className={`${styles.title} ${styles.center}`}>업무 장비를 확인합시다!</h1>
      <div className={`${styles.circleIllustration} ${styles.equipmentIcons}`}><img src={monitorIcon} alt="업무용 모니터" /><img src={mouseIcon} alt="업무용 마우스" /></div>
      <div className={styles.equipmentArea}>
        <div className={styles.generalWrap}><span>소중한 내칼...</span><img src={general} alt="장군 캐릭터" className={styles.generalImage} /></div>
        <div className={styles.checkList}>
          <p className={styles.equipmentQuote}>출전 전, 장수는 반드시<br/>자신의 무기를 점검한다</p>
          <p className={styles.equipmentPrompt}>당신의 무기는 노트북과 모니터이다.</p>
          <strong className={styles.checkTitle}>체크해볼 것</strong>
          <CustomChecklist items={items} readOnly className={styles.equipmentChecklist} rowClassName={styles.checkItem} labelClassName={styles.equipmentCheckLabel} renderIndicator={() => <span className={styles.checkMark} aria-hidden="true">✅</span>} />
        </div>
      </div>
      <div className={styles.center}><img className={styles.waitingBadgeImage} src={waitingBadge} alt="대기중" /></div>
    </section>
    <BaseButton className={styles.button} onClick={() => window.alert('아직 확인이 완료되지 않았습니다')}>다음</BaseButton>
    <p className={styles.equipmentFootnote}>🌱 부서별로 지급품이 상이할 수 있습니다.</p>
  </main>;
}
