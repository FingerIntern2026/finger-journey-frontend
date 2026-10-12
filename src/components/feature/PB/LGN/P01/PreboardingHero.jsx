// 역할: 사원 이름과 안내 문구, 새싹 일러스트를 표시하는 프리보딩 인트로 영역.
// 사용처: PB_LGN_P01, PB_LGN_P02
// 담당자: 김재웅

import styles from "./PreboardingHero.module.css";
import fingerLogo from "../../../../../assets/finger-logo.png";
import preboardingSprout from "../../../../../assets/preboarding-sprout.png";

/** PB_LGN_P01, PB_LGN_P02에서 공유하는 프리보딩 환영 영역. */
export default function PreboardingHero({ name, description }) {
  return (
    <header className={styles.hero}>
      <div className={styles.topLine} />
      <img className={styles.brand} src={fingerLogo} alt="Finger" />
      <h1 className={styles.title}>
        최고의 인재,
        <br />
        <strong>{name}</strong>님의
        <br />
        입사를 축하합니다
      </h1>
      <p className={styles.description}>{description}</p>
      <img className={styles.sprout} src={preboardingSprout} alt="" />
    </header>
  );
}
