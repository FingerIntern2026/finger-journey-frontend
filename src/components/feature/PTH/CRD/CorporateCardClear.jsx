import BaseButton from "../../../common/base/BaseButton";
import Header from "../common/Header";
import PageLayout from "../common/PageLayout";
import CorporateCardIntro from "./CorporateCardIntro";
import styles from "./CorporateCard.module.css";

export default function CorporateCardClear({ onBack, onComplete }) {
  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={5} total={9} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <CorporateCardIntro showCount={false} />
        <section className={styles.clearContent}>
          <img src="/assets/pth/story/confetti.png" alt="축하 폭죽" className={styles.clearImage} />
          <h2>STAGE CLEAR!</h2>
          <p>법인카드 사용법 숙지 완료!</p>
          <p>업무에 똑똑하게 활용해 주세요.</p>
        </section>
        <div className={styles.actionArea}>
          <BaseButton label="✓ 완료 · 맵으로 돌아가기" onClick={onComplete} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
