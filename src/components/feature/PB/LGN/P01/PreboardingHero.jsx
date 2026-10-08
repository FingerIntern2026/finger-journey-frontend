import styles from "./PreboardingHero.module.css";

/** PB_LGN_P01, PB_LGN_P02에서 공유하는 프리보딩 환영 영역. */
export default function PreboardingHero({ name, description }) {
  return (
    <header className={styles.hero}>
      <div className={styles.topLine} />
      <span className={styles.brand}>Finger</span>
      <h1 className={styles.title}>
        최고의 인재,
        <br />
        <strong>{name}</strong>님의
        <br />
        입사를 축하합니다
      </h1>
      <p className={styles.description}>{description}</p>
      <img className={styles.sprout} src="/icons/sprout.svg" alt="" />
    </header>
  );
}
