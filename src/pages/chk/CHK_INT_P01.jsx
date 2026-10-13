import BaseInput from '../../components/common/base/BaseInput';
import BaseButton from '../../components/common/base/BaseButton';
import { useState } from 'react';
import useNavigationStore from '../../stores/useNavigationStore';
import logo from '../../assets/checkin/finger-logo.png';
import flowers from '../../assets/checkin/flowers.png';
import leaf from '../../assets/checkin/leaf.png';
import styles from './checkin.module.css';

export default function CheckinPasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const goForward = useNavigationStore((state) => state.goForward);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password.trim()) return setError('암호를 입력해주세요');
    setError('');
    goForward('CHK_EXP_P01');
  };

  return (
    <main className={`${styles.page} ${styles.intPage}`}>
      <img className={styles.logoImage} src={logo} alt="Finger" />
      <section className={styles.intContent}>
        <div className={styles.introHeadingRow}>
          <h1 className={styles.title}>또 만났네요!<br/><strong>체크인 페이지로</strong><br/>이동해볼까요?</h1>
          <img className={styles.introLeaf} src={leaf} alt="잎사귀" />
        </div>

        <p className={styles.description}>
          HR담당자님이 알려주신
          <br />
          우리만의 암호를 입력해주세요!
        </p>
      </section>

      <form className={styles.intForm} onSubmit={handleSubmit}>
        <BaseInput wrapperClassName={styles.intInputWrapper} className={styles.intField} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="우리만의 암호는?" aria-label="체크인 암호" />
        <p className={styles.error}>{error}</p>
        <img className={styles.intFlowers} src={flowers} alt="알록달록한 꽃 일러스트" />
        <BaseButton type="submit" className={`${styles.button} ${styles.intButton}`}>입력했어요</BaseButton>
      </form>
    </main>
  );
}
