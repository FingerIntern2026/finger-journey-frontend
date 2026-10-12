import BaseButton from "../../components/common/base/BaseButton";
import WikiIntroHero from "../../components/feature/WIK/INT/P01/WikiIntroHero";
import useNavigationStore from "../../stores/useNavigationStore";
import styles from "./WIK_INT_P01.module.css";

export default function WIK_INT_P01({ preview = false }) {
  const goForward = useNavigationStore((state) => state.goForward);
  return (
    <main className={`${styles.page} ${preview ? styles.previewPage : ""}`}>
      <div className={styles.content}>
        <header className={styles.header}>
          <strong>Finger</strong>
          <BaseButton label="관리자페이지 이동" variant="ghost" className={styles.adminButton} onClick={() => !preview && goForward("ADM_EMP_P01")} />
        </header>
        <WikiIntroHero />
        <BaseButton label="핑거 위키 둘러보기  →" fullWidth className={styles.exploreButton} onClick={() => !preview && goForward("WIK_LIS_P01")} />
      </div>
    </main>
  );
}
