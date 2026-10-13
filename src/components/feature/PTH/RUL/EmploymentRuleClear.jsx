import BaseButton from "../../../common/base/BaseButton";
import Header from "../common/Header";
import PageLayout from "../common/PageLayout";
import styles from "./EmploymentRule.module.css";

export default function EmploymentRuleClear({ onBack, onComplete }) {
  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={2} total={9} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <header className={styles.intro}>
          <div className={styles.titleRow}>
            <img src="/assets/pth/map/employment-rules.png" alt="" className={styles.titleIcon} />
            <h1 className={styles.title}>취업규칙(7/7)</h1>
          </div>
          <p className={styles.subtitle}>함께 지켜야 할 약속을 알아봐요.</p>
        </header>

        <section className={styles.clearContent}>
          <img src="/assets/pth/story/confetti.png" alt="축하 폭죽" className={styles.clearImage} />
          <h2>STAGE CLEAR!</h2>
          <p>취업 규칙 완료! 다음 스테이지로 가볼까요?</p>
        </section>

        <div className={styles.actionArea}>
          <BaseButton label="✓ 완료 · 맵으로 돌아가기" onClick={onComplete} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
