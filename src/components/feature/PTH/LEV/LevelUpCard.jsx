import { Lightbulb } from "lucide-react";
import ContentCarousel from "../../../common/layout/ContentCarousel";
import styles from "./LevelUp.module.css";

function Lines({ children }) {
  return children.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}</span>);
}

export default function LevelUpCard({ guide, step }) {
  return (
    <article className={`${styles.card} ${styles[`cardStep${step}`]}`}>
      <h2>{guide.title}</h2>
      <ContentCarousel imageSrc={guide.image} imageAlt={guide.imageAlt} className={styles.illustration} />
      <p className={styles.description}><Lines>{guide.description}</Lines></p>
      {guide.tip && (
        <aside className={styles.tip}>
          <Lightbulb size={20} strokeWidth={1.8} aria-hidden="true" />
          <p>{guide.tip}</p>
        </aside>
      )}
    </article>
  );
}
