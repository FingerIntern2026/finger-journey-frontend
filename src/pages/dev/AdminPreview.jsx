import { useState } from "react";
import ADM_EMP_P01 from "../adm/ADM_EMP_P01";
import ADM_HRC_P01 from "../adm/ADM_HRC_P01";
import ADM_PRG_P01 from "../adm/ADM_PRG_P01";
import ADM_WIK_P01 from "../adm/ADM_WIK_P01";
import styles from "./PreboardingPreview.module.css";

/**
 * 백엔드 없이 관리자 화면 퍼블리싱만 확인하기 위한 개발 전용 페이지.
 * 실행 주소: http://localhost:5173/?preview=admin
 */
export default function AdminPreview() {
  const [selectedScreenCode, setSelectedScreenCode] = useState("ADM_EMP_P01");
  const previewPages = {
    ADM_EMP_P01,
    ADM_WIK_P01,
    ADM_PRG_P01,
    ADM_HRC_P01,
  };
  const SelectedPage = previewPages[selectedScreenCode];

  return (
    <div className={styles.adminPreviewShell}>
      <nav className={styles.adminToolbar} aria-label="관리자 화면 미리보기">
        <strong>관리자 미리보기</strong>
        <div>
          {Object.keys(previewPages).map((screenCode) => (
            <button key={screenCode} type="button" className={selectedScreenCode === screenCode ? styles.active : ""} onClick={() => setSelectedScreenCode(screenCode)}>
              {screenCode}
            </button>
          ))}
        </div>
      </nav>
      <SelectedPage preview />
    </div>
  );
}
