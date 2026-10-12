import { useState } from "react";
import WIK_INT_P01 from "../wik/WIK_INT_P01";
import WIK_LIS_P01 from "../wik/WIK_LIS_P01";
import styles from "./PreboardingPreview.module.css";

const previewPages = { WIK_INT_P01, WIK_LIS_P01 };

export default function WikiPreview() {
  const [selectedScreenCode, setSelectedScreenCode] = useState("WIK_INT_P01");
  const SelectedPage = previewPages[selectedScreenCode];
  return <div className={styles.adminPreviewShell}>
    <nav className={styles.adminToolbar} aria-label="핑거 위키 미리보기"><strong>핑거 위키 미리보기</strong><div>{Object.keys(previewPages).map((screenCode) => <button key={screenCode} type="button" className={selectedScreenCode === screenCode ? styles.active : ""} onClick={() => setSelectedScreenCode(screenCode)}>{screenCode}</button>)}</div></nav>
    <SelectedPage preview />
  </div>;
}
