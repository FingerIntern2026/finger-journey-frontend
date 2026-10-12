import BaseButton from "../../../common/base/BaseButton";
import Header from "../../../common/layout/Header";
import PageLayout from "../../../common/layout/PageLayout";
import FingerStoryCard from "./FingerStoryCard";
import FingerStoryIntro from "./FingerStoryIntro";
import { FINGER_STORIES } from "./fingerStoryData";
import styles from "./FingerStory.module.css";

export default function FingerStoryPage({ step, onBack, onNext }) {
  const story = FINGER_STORIES[step - 1];

  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={0} total={10} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <FingerStoryIntro step={step} />
        <FingerStoryCard story={story} step={step} />
        <div className={styles.actionArea}>
          <BaseButton
            label="다음"
            onClick={onNext}
            fullWidth
            className={styles.nextButton}
            aria-label={`핑거 이야기 ${step + 1} 화면으로 이동`}
          />
        </div>
      </div>
    </PageLayout>
  );
}
