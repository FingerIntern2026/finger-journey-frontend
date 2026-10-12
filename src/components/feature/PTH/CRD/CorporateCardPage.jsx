import BaseButton from "../../../common/base/BaseButton";
import Header from "../../../common/layout/Header";
import PageLayout from "../../../common/layout/PageLayout";
import CorporateCardContent from "./CorporateCardContent";
import CorporateCardIntro from "./CorporateCardIntro";
import { CORPORATE_CARD_GUIDES } from "./corporateCardData";
import styles from "./CorporateCard.module.css";

export default function CorporateCardPage({ step, onBack, onNext }) {
  const guide = CORPORATE_CARD_GUIDES[step - 1];

  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={5} total={9} onBack={onBack} />}
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
