import BaseButton from "../../../common/base/BaseButton";
import PathProgressHeader from "../common/PathProgressHeader";
import PageLayout from "../common/PageLayout";
import ForestCard from "./ForestCard";
import ForestIntro from "./ForestIntro";
import { FOREST_GUIDES } from "./forestData";
import styles from "./Forest.module.css";

export default function ForestPage({ step, onBack, onNext }) {
  return (
    <PageLayout
      className={styles.page}
      header={<PathProgressHeader onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <ForestIntro step={step} />
        <ForestCard guide={FOREST_GUIDES[step - 1]} step={step} />
        <div className={styles.actionArea}>
          <BaseButton label="다음" onClick={onNext} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
