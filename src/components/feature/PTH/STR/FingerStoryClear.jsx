import BaseButton from "../../../common/base/BaseButton";
import Header from "../common/Header";
import PageLayout from "../common/PageLayout";
import FingerStoryIntro from "./FingerStoryIntro";
import { STORY_ASSET } from "./fingerStoryData";
import styles from "./FingerStory.module.css";

export default function FingerStoryClear({ onBack, onComplete }) {
  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={0} total={9} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <FingerStoryIntro step={6} showCount={false} />

        <section className={styles.clearContent} aria-labelledby="story-clear-title">
          <img
            src={`${STORY_ASSET}/confetti.png`}
            alt="축하 폭죽"
            className={styles.clearIllustration}
          />
          <h2 id="story-clear-title" className={styles.clearTitle}>STAGE CLEAR!</h2>
          <p className={styles.clearMessage}>
            핑거 이야기 완료!
            <span>다음 스테이지로 가볼까요?</span>
          </p>
        </section>

        <div className={styles.actionArea}>
          <BaseButton
            label="✓ 완료 · 맵으로 돌아가기"
            onClick={onComplete}
            fullWidth
            className={styles.nextButton}
          />
        </div>
      </div>
    </PageLayout>
  );
}
