import styles from "./EthicsRule.module.css";

export default function EthicsIntro({ step, showCount = true }) {
  return (
    <header className={styles.intro}>
      <div className={styles.titleRow}>
        <img src="/assets/pth/map/ethics.png" alt="" className={styles.titleIcon} />
        <h1 className={styles.title}>윤리규정{showCount ? `(${step}/4)` : ""}</h1>
      </div>
      <p className={styles.subtitle}>함께 지켜야 할 약속을 알아봐요.</p>
    </header>
  );
}
