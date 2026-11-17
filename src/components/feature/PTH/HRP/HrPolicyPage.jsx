import BaseButton from "../../../common/base/BaseButton";
import PathProgressHeader from "../common/PathProgressHeader";
import PageLayout from "../common/PageLayout";
import HrPolicyCard from "./HrPolicyCard";
import HrPolicyIntro from "./HrPolicyIntro";
import { HR_POLICIES } from "./hrPolicyData";
import styles from "./HrPolicy.module.css";

export default function HrPolicyPage({ step, onBack, onNext }) {
  return (
    <PageLayout
      className={styles.page}
      header={<PathProgressHeader onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <HrPolicyIntro step={step} />
        <HrPolicyCard policy={HR_POLICIES[step - 1]} step={step} />
        <div className={styles.actionArea}>
          <BaseButton label="다음" onClick={onNext} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
