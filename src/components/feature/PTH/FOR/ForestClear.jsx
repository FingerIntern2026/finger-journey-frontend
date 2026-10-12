import BaseButton from "../../../common/base/BaseButton";
import Header from "../../../common/layout/Header";
import PageLayout from "../../../common/layout/PageLayout";
import ForestIntro from "./ForestIntro";
import styles from "./Forest.module.css";

const FOREST_BOARD_URL = import.meta.env.VITE_FOREST_BOARD_URL;

export default function ForestClear({ onBack, onComplete }) {
  const handleBoardClick = () => {
    if (FOREST_BOARD_URL) window.open(FOREST_BOARD_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={6} total={9} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <ForestIntro showCount={false} />
        <section className={styles.clearContent}>
          <img src="/assets/pth/story/confetti.png" alt="축하 폭죽" className={styles.clearImage} />
          <h2>STAGE CLEAR!</h2>
          <span>더 알고 싶다면?</span>
          <button type="button" className={styles.boardLink} onClick={handleBoardClick} title={FOREST_BOARD_URL ? undefined : "게시판 URL 연결 예정"}>
            🔗 포레스트 게시판 바로가기 ↗
          </button>
        </section>
        <div className={styles.actionArea}>
          <BaseButton label="✓ 완료 · 맵으로 돌아가기" onClick={onComplete} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
