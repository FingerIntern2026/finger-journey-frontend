import { useState } from 'react';
import BaseButton from '../../../common/base/BaseButton';
import BaseInput from '../../../common/base/BaseInput';
import logo from '../../../../assets/checkin/finger-logo.png';
import flowers from '../../../../assets/checkin/flowers.png';
import leaf from '../../../../assets/checkin/leaf.png';
import styles from './CheckinPassword.module.css';

export default function CheckinPassword({ onSubmit }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    onSubmit(password);
  };

  return (
    <main className={styles.page}>
      <img className={styles.logoImage} src={logo} alt="Finger" />
      <section className={styles.content}>
        <div className={styles.headingRow}>
          <h1 className={styles.title}>
            또 만났네요!
            <br />
            <strong>체크인 페이지로</strong>
            <br />
            이동해볼까요?
          </h1>
          <img className={styles.leaf} src={leaf} alt="잎사귀" />
        </div>

        <p className={styles.description}>
          HR담당자님이 알려주신
          <br />
          우리만의 암호를 입력해주세요!
        </p>
      </section>

      <form className={styles.form} onSubmit={handleSubmit}>
        <BaseInput
          wrapperClassName={styles.inputWrapper}
          className={styles.field}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="우리만의 암호는?"
          aria-label="체크인 암호"
        />
        <p className={styles.error}>{error}</p>
        <img className={styles.flowers} src={flowers} alt="알록달록한 꽃 일러스트" />
        <BaseButton type="submit" className={`${styles.button} ${styles.submitButton}`}>
          입력했어요
        </BaseButton>
      </form>
    </main>
  );
}
