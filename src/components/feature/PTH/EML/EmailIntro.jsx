import styles from "./EmailGuide.module.css";

export default function EmailIntro() {
  return (
    <header className={styles.intro}>
      <div className={styles.titleRow}>
        <img src="/assets/pth/map/email.png" alt="" className={styles.titleIcon} />
        <h1 className={styles.title}>이메일</h1>
      </div>
      <p className={styles.subtitle}>이메일 작성하는 방법을 알아봐요.</p>
    </header>
  );
}
