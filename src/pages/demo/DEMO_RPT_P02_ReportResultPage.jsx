// 페이지명: ReportResultPage (TODO: 정식 화면명 확정되면 교체)
// 역할: "완주 여정 데모"에서 리포트 생성/조회 버튼을 누르면 넘어오는 결과 전용 화면.
//       9/21 Claude 아티팩트("핑거 첫걸음 리포트") 원본 HTML을 마크업 구조·클래스명·색상
//       토큰까지 그대로 이식함 (reportResult.module.css 참고). employeeId만 받아서
//       자체적으로 리포트/3행시를 조회함
// 사용처: ReportExamplePage에서 리포트 생성/조회 시
//         goToScreen(SCREEN_CODES.DEMO_REPORT_RESULT, { employeeId })로 진입
// url: /demo/report/result
// 담당자:

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sendPost } from "../../api/client";
import { parseApiError } from "../../utils/apiError";
import PageLayout from "../../components/common/layout/PageLayout.jsx";
import Header from "../../components/common/layout/Header.jsx";
import BaseErrorCard from "../../components/common/base/BaseErrorCard.jsx";
import useNavigation from "../../hooks/useNavigation";
import styles from "./DEMO_RPT_P02_ReportResult.module.css";

// reportContent는 AI가 \n\n으로 문단을 구분해서 주므로, 원본 아티팩트처럼 <p>를 여러 개로 쪼갬
function splitParagraphs(text) {
  return (text ?? "").split(/\n\n+/).filter(Boolean);
}

export default function ReportResultPage() {
  const location = useLocation();
  const { goBack } = useNavigation();
  const employeeId = location.state?.employeeId;

  const [report, setReport] = useState(null);
  const [poemLines, setPoemLines] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!employeeId) {
      setLoading(false);
      return;
    }

    // StrictMode(개발 모드)는 effect를 마운트 시 일부러 두 번 실행함 — 첫 번째 실행이
    // "취소"됐다는 걸 표시해두고, 그 응답이 나중에 와도 state에 반영하지 않게 막음
    // (막아도 네트워크 요청 자체는 두 번 나감 — DevTrace 패널에 API가 2번 찍히는 게 정상)
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const reportResponse = await sendPost("/api/reports/detail", { employeeId });
        if (cancelled) return;
        setReport(reportResponse.data);

        // 3행시는 있으면 보여주고, 없으면 그냥 생략 (리포트 화면이 3행시 유무로 실패하면 안 됨)
        try {
          const poemResponse = await sendPost("/complete/poem/my", { employeeId });
          if (cancelled) return;
          setPoemLines(poemResponse.data.lines);
        } catch {
          if (!cancelled) setPoemLines([]);
        }
      } catch (err) {
        if (!cancelled) setError(parseApiError(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [employeeId]);

  return (
    <PageLayout header={<Header label="완주 리포트" onBack={goBack} />}>
      <div className={styles.page}>

        {!employeeId && (
          <BaseErrorCard message="전달받은 사원 정보가 없습니다. 완주 여정 데모 화면에서 다시 시도해주세요." />
        )}

        {loading && <p className={styles.loadingText}>리포트를 불러오는 중...</p>}

        {error && (
          <BaseErrorCard code={error.code} message={error.message} />
        )}

        {report && (
          <div className={styles.phone}>

            <div className={styles.progressHead}>
              <span className={styles.back}>‹</span>
              <div className={styles.bar}><div className={styles.barFill} /></div>
              {/* 리포트 생성 자체가 퀴즈 9문항 완료를 전제조건으로 하므로 항상 9/9 */}
              <span className={styles.num}>9/9</span>
              <span className={styles.sprout}>🌱</span>
            </div>

            <div className={styles.hero}>
              <div className={styles.eyebrowBadge}>✦ AI가 정리한 나의 첫 페이지</div>
              <h1>{report.employeeName}님의 첫걸음</h1>
              <div className={styles.subhead}>
                오늘의 첫 페이지 · 취향 9개로 완성
              </div>
            </div>

            <section className={styles.section} style={{ paddingTop: 10 }}>
              {report.headline && <div className={styles.nickTitle}>{report.headline}</div>}

              <div className={styles.story}>
                {splitParagraphs(report.reportContent).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {report.quote && (
                <div className={styles.taglineCard}>
                  <div className={styles.line}>"{report.quote}"</div>
                  {report.quoteDescription && (
                    <div className={styles.desc}>{report.quoteDescription}</div>
                  )}
                </div>
              )}

              {report.keywords?.length > 0 && (
                <div className={styles.chipGrid}>
                  {report.keywords.map((keyword) => (
                    <div key={keyword} className={styles.chip}>
                      <span className={styles.dot} />
                      {keyword}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {poemLines.length > 0 && (
              <>
                <div className={styles.divider} />
                <section className={styles.section}>
                  <h2 className={styles.title}>✦ 완주 기념 3행시</h2>
                  <div className={styles.acrosticCard}>
                    <div className={styles.acrosticTag}>
                      {report.employeeName} #오솔길완주 #3행시
                    </div>
                    {poemLines.map((line, index) => (
                      <div key={index} className={styles.acrosticRow}>
                        <div className={styles.acrosticLetter}>{line.letter}</div>
                        <div className={styles.acrosticText}>{line.text}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

          </div>
        )}

      </div>
    </PageLayout>
  );
}
