import styles from "./HrPolicy.module.css";

export default function HrPolicyIntro({ step, showCount = true }) {
  return (
    <header className={styles.intro}>
      <div className={styles.titleRow}>
        <img src="/assets/pth/map/hr-rules.png" alt="" className={styles.titleIcon} />
        <h1 className={styles.title}>
          인사규정{showCount ? `(${step}/3)` : ""}
        </h1>
      </div>
      <p className={styles.subtitle}>함께 지켜야 할 약속을 알아봐요.</p>
    </header>
  );
}
