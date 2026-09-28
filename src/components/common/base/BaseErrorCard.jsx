// 역할: API 에러(parseApiError가 반환하는 {code, message})를 보여주는 카드.
//       ReportExamplePage(3곳)/ReportResultPage(2곳)에 복붙돼있던 마크업을 하나로 뽑음
// 사용처: DEMO_RPT_P01_ReportExamplePage.jsx, DEMO_RPT_P02_ReportResultPage.jsx
// 담당자:

import styles from './base.module.css';

// code는 없을 수 있음 (예: 네트워크 에러거나, 안내 문구만 보여주는 경우)
export default function BaseErrorCard({ code, message, style }) {
  return (
    <div className={styles.errorCard} style={style}>
      {code && <p className={styles.errorCode}>{code}</p>}
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
}
