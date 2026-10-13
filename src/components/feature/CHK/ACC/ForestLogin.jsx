import BaseButton from '../../../common/base/BaseButton';
import LoginWebviewEmbed from '../../../common/custom/LoginWebviewEmbed';
import erpLogin from '../../../../assets/checkin/erp-login.png';
import CheckinHeader from '../common/CheckinHeader';
import styles from './AccountGuide.module.css';

export default function ForestLogin({ onBack, onNext }) {
  return (
    <main className={styles.page}>
      <CheckinHeader progress={57} onBack={onBack} />
      <section className={styles.content}>
        <h1 className={styles.title}>포레스트에 접속해볼까요?</h1>
        <div className={styles.loginPreview}>
          <LoginWebviewEmbed
            previewImage={erpLogin}
            title="포레스트 로그인 화면"
            height="auto"
            previewObjectFit="contain"
            previewClassName={styles.screenImage}
          />
          <strong>http://pms.fingerservice.co.kr/</strong>
        </div>
        <p className={`${styles.accountInfo} ${styles.forestAccountInfo}`}>
          회사 아이디 : FINGER
          <br />
          아이디 : 사번
          <br />
          초기비밀번호 : 담당자님께 여쭤보기
        </p>
      </section>
      <BaseButton className={styles.nextButton} onClick={onNext}>로그인했어요</BaseButton>
    </main>
  );
}
