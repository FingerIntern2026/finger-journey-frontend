import BaseButton from "../../../common/base/BaseButton";
import Header from "../common/Header";
import PageLayout from "../common/PageLayout";
import LevelUpCard from "./LevelUpCard";
import LevelUpIntro from "./LevelUpIntro";
import { LEVEL_UP_GUIDES } from "./levelUpData";
import styles from "./LevelUp.module.css";

export default function LevelUpPage({ step, onBack, onNext }) {
  return (
    <PageLayout className={styles.page} header={<Header label="온보딩 진행 중" current={7} total={9} onBack={onBack} />}>
      <div className={styles.pageBody}>
        <LevelUpIntro step={step} />
        <LevelUpCard guide={LEVEL_UP_GUIDES[step - 1]} step={step} />
        <div className={styles.actionArea}>
          <BaseButton label="다음" onClick={onNext} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
