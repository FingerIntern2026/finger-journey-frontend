import BaseButton from "../../../common/base/BaseButton";
import Header from "../../../common/layout/Header";
import PageLayout from "../../../common/layout/PageLayout";
import EthicsIntro from "./EthicsIntro";
import styles from "./EthicsRule.module.css";

export default function EthicsRuleClear({ onBack, onComplete }) {
  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={3} total={9} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <EthicsIntro showCount={false} />
        <section className={styles.clearContent}>
          <img src="/assets/pth/story/confetti.png" alt="축하 폭죽" className={styles.clearImage} />
          <h2>STAGE CLEAR!</h2>
          <p>윤리규정 살펴보기 완료! 다음 스테이지로 가볼까요?</p>
        </section>
        <div className={styles.actionArea}>
          <BaseButton label="✓ 완료 · 맵으로 돌아가기" onClick={onComplete} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
