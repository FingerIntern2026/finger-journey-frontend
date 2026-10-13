import styles from "./CorporateCard.module.css";

function MultilineText({ children }) {
  return children.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}</span>);
}

export default function CorporateCardContent({ guide, step }) {
  return (
    <article className={`${styles.card} ${styles[`cardStep${step}`]}`}>
      <h2>{guide.title}</h2>
      <div className={styles.illustration}>
        <img src={guide.image} alt={guide.imageAlt} />
      </div>
      <p className={styles.description}><MultilineText>{guide.description}</MultilineText></p>
    </article>
  );
}
