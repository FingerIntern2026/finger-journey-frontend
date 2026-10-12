import styles from "./FingerStory.module.css";

export default function FingerStoryIntro({ step, showCount = true }) {
  return (
    <header className={styles.storyIntro}>
      <div className={styles.storyTitleRow}>
        <img src="/assets/pth/map/story.png" alt="" className={styles.storyIcon} />
        <h1 className={styles.storyTitle}>
          핑거 이야기{showCount ? `(${step}/6)` : ""}
        </h1>
      </div>
      <p className={styles.storySubtitle}>핑거가 걸어온 길과 지금의 모습을 알아봐요</p>
    </header>
  );
}
