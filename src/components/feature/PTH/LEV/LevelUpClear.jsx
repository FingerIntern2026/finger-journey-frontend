import BaseButton from "../../../common/base/BaseButton";
import Header from "../common/Header";
import PageLayout from "../common/PageLayout";
import LevelUpIntro from "./LevelUpIntro";
import styles from "./LevelUp.module.css";

const LEVEL_UP_BOARD_URL = import.meta.env.VITE_LEVEL_UP_BOARD_URL;

export default function LevelUpClear({ onBack, onComplete }) {
  const handleBoardClick = () => {
    if (LEVEL_UP_BOARD_URL) window.open(LEVEL_UP_BOARD_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <PageLayout className={styles.page} header={<Header label="온보딩 진행 중" current={7} total={9} onBack={onBack} />}>
      <div className={styles.pageBody}>
        <LevelUpIntro showCount={false} />
        <section className={styles.clearContent}>
          <img src="/assets/pth/story/confetti.png" alt="축하 폭죽" className={styles.clearImage} />
          <h2>STAGE CLEAR!</h2>
          <span>더 알고 싶다면?</span>
          <button type="button" className={styles.boardLink} onClick={handleBoardClick} title={LEVEL_UP_BOARD_URL ? undefined : "게시판 URL 연결 예정"}>
            🔗 레벨업 게시판 바로가기 ↗
          </button>
        </section>
        <div className={styles.actionArea}>
          <BaseButton label="✓ 완료 · 맵으로 돌아가기" onClick={onComplete} fullWidth className={styles.nextButton} />
        </div>
      </div>
    </PageLayout>
  );
}
