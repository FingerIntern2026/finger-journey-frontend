import styles from "./Forest.module.css";

export default function ForestIntro({ step, showCount = true }) {
  return (
    <header className={styles.intro}>
      <div className={styles.titleRow}>
        <img src="/assets/pth/map/forest.png" alt="" className={styles.titleIcon} />
        <h1 className={styles.title}>FOREST{showCount ? `(${step}/6)` : ""}</h1>
      </div>
      <p className={styles.subtitle}>포레스트 PMS 사용법을 배우고<br />함께 성장해요!</p>
    </header>
  );
}
