import styles from "./CorporateCard.module.css";

export default function CorporateCardIntro({ step, showCount = true }) {
  return (
    <header className={styles.intro}>
      <div className={styles.titleRow}>
        <img src="/assets/pth/map/corporate-card.png" alt="" className={styles.titleIcon} />
        <h1 className={styles.title}>법인카드{showCount ? `(${step}/7)` : ""}</h1>
      </div>
      <p className={styles.subtitle}>법인카드 사용법을 알아봐요.</p>
    </header>
  );
}
