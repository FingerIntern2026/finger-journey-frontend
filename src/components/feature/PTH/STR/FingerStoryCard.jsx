import styles from "./FingerStory.module.css";

export default function FingerStoryCard({ story, step }) {
  return (
    <article className={styles.storyCard}>
      <div className={styles.cardHeading}>
        <h2>{story.title}</h2>
        <p>{story.period}</p>
      </div>

      <div className={`${styles.illustrationArea} ${styles[`illustrationStep${step}`]}`}>
        <img src={story.image} alt={story.imageAlt} />
      </div>

      <p className={styles.storyDescription}>
        {story.description.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </article>
  );
}
