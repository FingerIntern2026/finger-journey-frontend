import BaseButton from '../../../common/base/BaseButton';
import CheckinWebview from '../common/CheckinWebview';
import CheckinHeader from '../common/CheckinHeader';
import styles from './AccountGuide.module.css';

export default function ForestLogin({ onBack, onNext }) {
  return (
    <main className={styles.page}>
      <CheckinHeader progress={57} onBack={onBack} />
      <section className={styles.content}>
        <h1 className={styles.title}>포레스트에 접속해볼까요?</h1>
        <CheckinWebview src={import.meta.env.VITE_FOREST_LOGIN_URL || 'http://pms.fingerservice.co.kr/'} title="포레스트 로그인" />
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
