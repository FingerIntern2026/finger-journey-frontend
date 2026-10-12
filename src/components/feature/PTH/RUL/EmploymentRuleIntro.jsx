import styles from "./EmploymentRule.module.css";

export default function EmploymentRuleIntro({ step }) {
  return (
    <header className={styles.intro}>
      <div className={styles.titleRow}>
        <img src="/assets/pth/map/employment-rules.png" alt="" className={styles.titleIcon} />
        <h1 className={styles.title}>취업규칙({step}/6)</h1>
      </div>
      <p className={styles.subtitle}>함께 지켜야 할 약속을 알아봐요.</p>
    </header>
  );
}
