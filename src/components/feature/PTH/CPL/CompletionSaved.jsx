import AcrosticResultScreen from "../../../common/custom/AcrosticResultScreen";
import PathProgressHeader from "../common/PathProgressHeader";
import PageLayout from "../common/PageLayout";
import styles from "./Completion.module.css";

export default function CompletionSaved({ name, lines, onBack, onNext }) {
  const resultLines = name.split("").map((letter, index) => ({ letter, text: lines[index] ?? "" }));

  return (
    <PageLayout className={styles.page} header={<PathProgressHeader onBack={onBack} extra={1} />}>
      <div className={styles.savedPage}>
        <img className={styles.savedLogo} src="/assets/pth/completion/finger-logo.png" alt="Finger" />
        <AcrosticResultScreen
          userBadgeText={`${name}  #오솔길완주 #3행시`}
          lines={resultLines}
          onButtonClick={onNext}
          confettiSrc="/assets/pth/completion/confetti.png"
        />
      </div>
    </PageLayout>
  );
}
