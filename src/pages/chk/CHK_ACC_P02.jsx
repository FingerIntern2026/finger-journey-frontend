import LoginWebviewEmbed from '../../components/common/custom/LoginWebviewEmbed';
import BaseButton from '../../components/common/base/BaseButton';
import useNavigationStore from '../../stores/useNavigationStore';
import erpLogin from '../../assets/checkin/erp-login.png';
import CheckinHeader from '../../components/feature/CHK/common/CheckinHeader';
import styles from './checkin.module.css';

export default function ForestLoginPage() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <main className={`${styles.page} ${styles.forestPage}`}>
    <CheckinHeader progress={57} onBack={goBack} />
    <section className={styles.content}>
      <h1 className={`${styles.title} ${styles.center}`}>포레스트에 접속해볼까요?</h1>
      <div className={styles.loginMock}><LoginWebviewEmbed previewImage={erpLogin} title="포레스트 로그인 화면" height="auto" previewObjectFit="contain" previewClassName={styles.screenImage} /><strong>http://pms.fingerservice.co.kr/</strong></div>
      <p className={styles.accountInfo}>회사 아이디 : FINGER<br/>아이디 : 사번<br/>초기비밀번호 : 담당자님께 여쭤보기</p>
    </section>
    <BaseButton className={styles.button} onClick={() => goForward('CHK_APR_P01')}>로그인했어요</BaseButton>
  </main>;
}
