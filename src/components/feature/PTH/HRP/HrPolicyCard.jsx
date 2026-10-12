import HrPolicyIcon from "./HrPolicyIcon";
import styles from "./HrPolicy.module.css";

export default function HrPolicyCard({ policy, step }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeading}>
        <h2>{policy.title}</h2>
        <p>{policy.intro.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
      </div>

      <div className={`${styles.illustration} ${styles[`illustrationStep${step}`]}`}>
        <img src={policy.image} alt={policy.imageAlt} />
      </div>

      <div className={styles.details}>
        {policy.details.map((detail) => (
          <section className={styles.detailItem} key={detail.title}>
            <span className={styles.detailIcon}><HrPolicyIcon name={detail.icon} /></span>
            <h3>{detail.title}</h3>
            <p>{detail.lines.map((line, index) => (
              line ? <span key={`${line}-${index}`}>{line}</span> : <br key={`space-${index}`} />
            ))}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
