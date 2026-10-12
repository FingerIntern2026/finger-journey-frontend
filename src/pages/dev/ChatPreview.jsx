import CHT_MAN_F01 from "../cht/CHT_MAN_F01";
import styles from "./PreboardingPreview.module.css";

export default function ChatPreview() {
  return (
    <div className={styles.adminPreviewShell}>
      <nav className={styles.adminToolbar} aria-label="AI 챗봇 미리보기">
        <strong>AI 챗봇 미리보기</strong>
        <span>CHT_MAN_F01</span>
      </nav>
      <CHT_MAN_F01 preview />
    </div>
  );
}
