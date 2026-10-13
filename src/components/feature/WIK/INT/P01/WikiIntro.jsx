import BaseButton from "../../../../common/base/BaseButton";
import fingerLogo from "../../../../../assets/finger-logo.png";
import WikiIntroHero from "./WikiIntroHero";
import styles from "./WikiIntro.module.css";

export default function WikiIntro({ onOpenAdmin, onExplore }) {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <img className={styles.brandLogo} src={fingerLogo} alt="Finger" />
          <BaseButton
            label="관리자페이지 이동"
            variant="ghost"
            className={styles.adminButton}
            onClick={onOpenAdmin}
          />
        </header>
        <WikiIntroHero />
        <BaseButton
          label="핑거 위키 둘러보기  →"
          fullWidth
          className={styles.exploreButton}
          onClick={onExplore}
        />
      </div>
    </main>
  );
}
