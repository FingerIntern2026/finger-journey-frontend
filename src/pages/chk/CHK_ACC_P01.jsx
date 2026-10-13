import BaseButton from '../../components/common/base/BaseButton';
import useNavigationStore from '../../stores/useNavigationStore';
import forestLogin from '../../assets/checkin/forest-login.png';
import forestLoginComplete from '../../assets/checkin/forest-login-complete.png';
import employeeNumberTip from '../../assets/checkin/employee-number-tip.png';
import CheckinHeader from './CheckinHeader';
import styles from './checkin.module.css';

export default function ErpAccountPage() {
  const goForward = useNavigationStore((state) => state.goForward);
  return <main className={`${styles.page} ${styles.accountPage}`}>
    <CheckinHeader progress={48} />
    <section className={styles.content}>
      <h1 className={`${styles.title} ${styles.center}`}>ERP에 접속해볼까요?</h1>
      <div className={styles.dualScreens}><img src={forestLogin} alt="ERP 로그인 전"/><img src={forestLoginComplete} alt="ERP 로그인 후"/></div>
      <p className={styles.accountInfo}>회사 아이디 : FINGER<br/>아이디 : 사번<br/>초기비밀번호 : 담당자님께 여쭤보기</p>
      <div className={styles.tipCard}><h2 className={styles.cardTitle}>사번 잘 외우는 꿀팁!</h2><img className={styles.tipImage} src={employeeNumberTip} alt="사번을 쉽게 외우는 방법" /><p>ex. 12101001 → 2021년 1월 첫번째 입사자</p></div>
    </section>
    <BaseButton className={styles.button} onClick={() => goForward('CHK_ACC_P02')}>로그인했어요</BaseButton>
  </main>;
}
