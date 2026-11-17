// 역할: 체크인 항목이 HR 확인을 기다리는 동안(또는 서버 오류가 났을 때) 화면 아래에 안내 문구를 띄운다.
// 사용처: 체크인 각 항목의 마지막 화면 페이지(CHK_DOC_P01 등)
// 담당자: 김재웅

import styles from "./BagGateNotice.module.css";

export default function BagGateNotice({ waiting, errorMessage }) {
  if (!waiting && !errorMessage) return null;

  return (
    <div className={`${styles.notice} ${errorMessage ? styles.error : ""}`} role={errorMessage ? "alert" : "status"}>
      {errorMessage || "HR 담당자가 확인하면 자동으로 다음으로 넘어가요."}
    </div>
  );
}
