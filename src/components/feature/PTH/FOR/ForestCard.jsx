import { Lightbulb, NotebookPen, Sprout, ThumbsUp } from "lucide-react";
import ContentCarousel from "../../../common/layout/ContentCarousel";
import styles from "./Forest.module.css";

function Lines({ children }) {
  return children.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}</span>);
}

export default function ForestCard({ guide, step }) {
  const tagIcons = [NotebookPen, ThumbsUp, Sprout];

  return (
    <article className={`${styles.card} ${styles[`cardStep${step}`]}`}>
      <h2><Lines>{guide.title}</Lines></h2>
      <ContentCarousel imageSrc={guide.image} imageAlt={guide.imageAlt} className={styles.illustration} />

      {guide.description && <p className={styles.description}><Lines>{guide.description}</Lines></p>}
      {guide.tags && (
        <div className={styles.tags}>
          {guide.tags.map((tag, index) => {
            const TagIcon = tagIcons[index];
            return (
              <span key={tag}>
                <TagIcon size={22} strokeWidth={1.8} aria-hidden="true" />
                {tag}
              </span>
            );
          })}
        </div>
      )}
      {guide.bullets && (
        <ol className={styles.bullets}>
          {guide.bullets.map((item) => <li key={item}>{item}</li>)}
        </ol>
      )}
      {guide.panels && (
        <div className={styles.panels}>
          {guide.panels.map((panel) => (
            <section key={panel.title}>
              <h3>{panel.title}</h3>
              <p>{panel.text}</p>
            </section>
          ))}
        </div>
      )}
      {guide.tip && (
        <aside className={styles.tip}>
          <Lightbulb size={20} strokeWidth={1.8} aria-hidden="true" />
          <p>{guide.tip}</p>
        </aside>
      )}
    </article>
  );
}
