import BaseButton from "../../../common/base/BaseButton";
import PathProgressHeader from "../common/PathProgressHeader";
import PageLayout from "../common/PageLayout";
import CorporateCardContent from "./CorporateCardContent";
import CorporateCardIntro from "./CorporateCardIntro";
import { CORPORATE_CARD_GUIDES } from "./corporateCardData";
import styles from "./CorporateCard.module.css";

export default function CorporateCardPage({ step, onBack, onNext }) {
  const guide = CORPORATE_CARD_GUIDES[step - 1];

  return (
    <PageLayout
      className={styles.page}
      header={<PathProgressHeader onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <CorporateCardIntro step={step} />
        <CorporateCardContent guide={guide} step={step} />
        <div className={styles.actionArea}>
          <BaseButton label="다음" onClick={onNext} fullWidth className={styles.nextButton} />
          {guide.note && <p className={styles.note}>🌱 {guide.note}</p>}
        </div>
      </div>
    </PageLayout>
  );
}
