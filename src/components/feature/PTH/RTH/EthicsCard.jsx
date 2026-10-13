import { Lightbulb } from "lucide-react";
import styles from "./EthicsRule.module.css";

function MultilineText({ children }) {
  return children.split("\n").map((line) => <span key={line}>{line}</span>);
}

export default function EthicsCard({ content, step }) {
  return (
    <article className={`${styles.card} ${styles[`cardStep${step}`]}`}>
      <h2><MultilineText>{content.title}</MultilineText></h2>

      <div className={styles.illustration}>
        <img src={content.image} alt={content.imageAlt} />
      </div>

      <p className={styles.description}><MultilineText>{content.description}</MultilineText></p>
      {content.emphasis && <strong className={styles.emphasis}>{content.emphasis}</strong>}
      {content.tip && (
        <aside className={styles.tip}>
          <Lightbulb size={22} strokeWidth={1.8} aria-hidden="true" />
          <p><MultilineText>{content.tip}</MultilineText></p>
        </aside>
      )}
    </article>
  );
}
