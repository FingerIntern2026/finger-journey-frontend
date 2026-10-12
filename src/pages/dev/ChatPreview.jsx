// 역할: AI 챗봇 화면을 단독으로 확인하기 위한 개발용 미리보기.
// 사용처: 개발 환경의 챗봇 미리보기 경로
// 담당자: 김재웅

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
