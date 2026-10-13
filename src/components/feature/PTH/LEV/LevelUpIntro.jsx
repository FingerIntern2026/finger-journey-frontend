import styles from "./LevelUp.module.css";

export default function LevelUpIntro({ step, showCount = true }) {
  return (
    <header className={styles.intro}>
      <div className={styles.titleRow}>
        <img src="/assets/pth/map/level-up.png" alt="" className={styles.titleIcon} />
        <h1 className={styles.title}>Level-Up{showCount ? `(${step}/5)` : ""}</h1>
      </div>
      <p className={styles.subtitle}>나의 성장을 스스로 디자인하고 증명하는<br />Level-Up 제도에 대해서 알아봐요!</p>
    </header>
  );
}
