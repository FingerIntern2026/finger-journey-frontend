import styles from "./EmailGuide.module.css";

export default function EmailGuideStep({ index, step }) {
  return (
    <article className={styles.guideStep}>
      <div className={styles.stepHeading}>
        <span className={styles.stepNumber}>{index + 1}</span>
        <div>
          <h2>{step.title}</h2>
          <p>{step.description}</p>
        </div>
      </div>
      <div className={styles.screenshotFrame}>
        <img src={step.image} alt={step.imageAlt} />
      </div>
    </article>
  );
}
