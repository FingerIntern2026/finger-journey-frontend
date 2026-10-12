import BaseButton from "../../../common/base/BaseButton";
import Header from "../../../common/layout/Header";
import PageLayout from "../../../common/layout/PageLayout";
import EmploymentRuleCard from "./EmploymentRuleCard";
import EmploymentRuleIntro from "./EmploymentRuleIntro";
import { EMPLOYMENT_RULES } from "./employmentRuleData";
import styles from "./EmploymentRule.module.css";

export default function EmploymentRulePage({ step, onBack, onNext }) {
  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={1} total={9} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <EmploymentRuleIntro step={step} />
        <EmploymentRuleCard rule={EMPLOYMENT_RULES[step - 1]} step={step} />
        <div className={styles.actionArea}>
          <BaseButton label="다음" onClick={onNext} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
