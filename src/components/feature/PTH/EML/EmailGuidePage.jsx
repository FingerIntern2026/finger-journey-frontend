import BaseButton from "../../../common/base/BaseButton";
import Header from "../../../common/layout/Header";
import PageLayout from "../../../common/layout/PageLayout";
import EmailGuideStep from "./EmailGuideStep";
import EmailIntro from "./EmailIntro";
import { EMAIL_GUIDE_STEPS } from "./emailGuideData";
import styles from "./EmailGuide.module.css";

export default function EmailGuidePage({ onBack, onNext }) {
  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={4} total={9} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <EmailIntro />
        <section className={styles.guideList} aria-label="이메일 작성 순서">
          {EMAIL_GUIDE_STEPS.map((step, index) => (
            <EmailGuideStep key={step.title} index={index} step={step} />
          ))}
        </section>
        <div className={styles.endMarker} aria-hidden="true" />
        <div className={styles.actionArea}>
          <BaseButton
            label="다음"
            onClick={onNext}
            fullWidth
            className={styles.nextButton}
          />
        </div>
      </div>
    </PageLayout>
  );
}
