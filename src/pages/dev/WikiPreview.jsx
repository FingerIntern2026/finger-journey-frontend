// 역할: 위키 화면을 전환하며 확인하는 개발용 미리보기.
// 사용처: 개발 환경의 위키 미리보기 경로
// 담당자: 김재웅

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
