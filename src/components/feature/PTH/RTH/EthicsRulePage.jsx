import BaseButton from "../../../common/base/BaseButton";
import Header from "../common/Header";
import PageLayout from "../common/PageLayout";
import EthicsCard from "./EthicsCard";
import EthicsIntro from "./EthicsIntro";
import { ETHICS_PAGES } from "./ethicsData";
import styles from "./EthicsRule.module.css";

export default function EthicsRulePage({ step, onBack, onNext }) {
  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={3} total={9} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <EthicsIntro step={step} />
        <EthicsCard content={ETHICS_PAGES[step - 1]} step={step} />
        <div className={styles.actionArea}>
          <BaseButton label="다음" onClick={onNext} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
