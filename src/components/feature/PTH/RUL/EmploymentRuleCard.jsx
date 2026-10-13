import RuleDetailIcon from "./RuleDetailIcon";
import styles from "./EmploymentRule.module.css";

export default function EmploymentRuleCard({ rule, step }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeading}>
        <h2>{rule.title}</h2>
        <p>{rule.intro.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
      </div>

      <div className={`${styles.illustration} ${styles[`illustrationStep${step}`]}`}>
        <img src={rule.image} alt={rule.imageAlt} />
      </div>

      <div className={`${styles.details} ${rule.details.length === 2 ? styles.twoColumns : ""}`}>
        {rule.details.map((detail) => (
          <section className={styles.detailItem} key={detail.title}>
            <span className={styles.detailIcon}><RuleDetailIcon name={detail.icon} /></span>
            <h3>{detail.title}</h3>
            <p>{detail.lines.map((line) => <span key={line}>{line}</span>)}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
