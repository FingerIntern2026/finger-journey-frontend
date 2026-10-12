// 역할: 핑거 위키의 목적을 소개하고 목록 화면으로 이동시키는 인트로 화면.
// 사용처: 화면 코드 WIK_INT_P01
// 담당자: 김재웅

import BaseButton from "../../components/common/base/BaseButton";
import WikiIntroHero from "../../components/feature/WIK/INT/P01/WikiIntroHero";
import fingerLogo from "../../assets/finger-logo.png";
import useNavigationStore from "../../stores/useNavigationStore";
import styles from "./WIK_INT_P01.module.css";

export default function WIK_INT_P01({ preview = false }) {
  const goForward = useNavigationStore((state) => state.goForward);
  return (
    <main className={`${styles.page} ${preview ? styles.previewPage : ""}`}>
      <div className={styles.content}>
        <header className={styles.header}>
          <img className={styles.brandLogo} src={fingerLogo} alt="Finger" />
          <BaseButton label="관리자페이지 이동" variant="ghost" className={styles.adminButton} onClick={() => !preview && goForward("ADM_EMP_P01")} />
        </header>
        <WikiIntroHero />
        <BaseButton label="핑거 위키 둘러보기  →" fullWidth className={styles.exploreButton} onClick={() => !preview && goForward("WIK_LIS_P01")} />
      </div>
    </main>
  );
}
