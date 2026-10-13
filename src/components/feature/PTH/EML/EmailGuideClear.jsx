import BaseButton from "../../../common/base/BaseButton";
import Header from "../../../common/layout/Header";
import PageLayout from "../../../common/layout/PageLayout";
import EmailIntro from "./EmailIntro";
import styles from "./EmailGuide.module.css";

export default function EmailGuideClear({ onBack, onComplete }) {
  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={4} total={9} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <EmailIntro />
        <section className={styles.clearContent}>
          <img src="/assets/pth/story/confetti.png" alt="축하 폭죽" className={styles.clearImage} />
          <h2>STAGE CLEAR!</h2>
          <p>이메일 작성법 숙지 완료!</p>
          <p>업무에 잘 활용해 주세요!</p>
        </section>
        <div className={styles.actionArea}>
          <BaseButton label="✓ 완료 · 맵으로 돌아가기" onClick={onComplete} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
