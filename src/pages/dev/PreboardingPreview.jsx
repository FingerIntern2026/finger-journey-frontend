import { useState } from "react";
import PB_LGN_P01 from "../pb/PB_LGN_P01";
import styles from "./PreboardingPreview.module.css";

const previewPages = {
  PB_LGN_P01,
};

/**
 * 백엔드 없이 프리보딩 화면의 퍼블리싱만 확인하기 위한 개발 전용 페이지.
 * 실행 주소: http://localhost:5173/?preview=preboarding
 */
export default function PreboardingPreview() {
  const [selectedScreenCode, setSelectedScreenCode] = useState("PB_LGN_P01");
  const SelectedPage = previewPages[selectedScreenCode];

  return (
    <div className={styles.previewShell}>
      <nav className={styles.toolbar} aria-label="프리보딩 화면 미리보기">
        <strong>프리보딩 미리보기</strong>
        <div>
          {Object.keys(previewPages).map((screenCode) => (
            <button
              key={screenCode}
              type="button"
              className={selectedScreenCode === screenCode ? styles.active : ""}
              onClick={() => setSelectedScreenCode(screenCode)}
            >
              {screenCode}
            </button>
          ))}
        </div>
      </nav>

      <SelectedPage preview />
    </div>
  );
}
