// ReportResultPage.jsx의 역할
// "완주 여정 데모"에서 리포트 생성/조회 버튼을 누르면 넘어오는 결과 전용 화면
// 9/21 Claude 아티팩트("핑거 첫걸음 리포트") 원본 HTML을 그대로 이식함
// (마크업 구조·클래스명·색상 토큰 전부 원본과 동일 — reportResult.module.css 참고)
//
// ReportExamplePage에서 goTo(ROUTE_PATHS.DEMO_REPORT_RESULT, { employeeId })로 넘어오고,
// 이 화면은 employeeId만 받아서 자체적으로 리포트/3행시를 조회함

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sendPost } from "../../api/client";
import { parseApiError } from "../../utils/apiError";
import PageLayout from "../../components/common/layout/PageLayout.jsx";
import Header from "../../components/common/layout/Header.jsx";
import useNavigation from "../../hooks/useNavigation";
import styles from "./reportResult.module.css";

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

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const reportResponse = await sendPost("/api/reports/detail", { employeeId });
        setReport(reportResponse.data);

        // 3행시는 있으면 보여주고, 없으면 그냥 생략 (리포트 화면이 3행시 유무로 실패하면 안 됨)
        try {
          const poemResponse = await sendPost("/complete/poem/my", { employeeId });
          setPoemLines(poemResponse.data.lines);
        } catch {
          setPoemLines([]);
        }
      } catch (err) {
        setError(parseApiError(err));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [employeeId]);

  return (
    <PageLayout header={<Header label="완주 리포트" onBack={goBack} />}>
      <div className={styles.page}>

        {!employeeId && (
          <div className={styles.errorCard}>
            <p className={styles.errorMessage}>
              전달받은 사원 정보가 없습니다. 완주 여정 데모 화면에서 다시 시도해주세요.
            </p>
          </div>
        )}

        {loading && <p className={styles.loadingText}>리포트를 불러오는 중...</p>}

        {error && (
          <div className={styles.errorCard}>
            <p className={styles.errorCode}>{error.code}</p>
            <p className={styles.errorMessage}>{error.message}</p>
          </div>
        )}

        {report && (
          <div className={styles.phone}>

            <div className={styles.progressHead}>
              <span className={styles.back}>‹</span>
              <div className={styles.bar}><div className={styles.barFill} /></div>
              <span className={styles.num}>{report.quizEvidence?.length ?? 0}/9</span>
              <span className={styles.sprout}>🌱</span>
            </div>

            <div className={styles.hero}>
              <div className={styles.eyebrowBadge}>✦ AI가 정리한 나의 첫 페이지</div>
              <h1>{report.employeeName}님의 첫걸음</h1>
              <div className={styles.subhead}>
                오늘의 첫 페이지 · 취향 {report.quizEvidence?.length ?? 0}개로 완성
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

            {report.quizEvidence?.length > 0 && (
              <>
                <div className={styles.divider} />
                <section className={styles.section}>
                  <h2 className={styles.title}>✦ 근거가 된 퀴즈 답변</h2>
                  <div className={styles.evidenceGrid}>
                    {report.quizEvidence.map((evidence, index) => (
                      <div key={index} className={styles.evCard}>
                        <div className={styles.q}>{evidence.question}</div>
                        <div className={styles.a}>{evidence.answer}</div>
                        <div className={styles.pct}>핑거 직원 {evidence.percentage}% 선택</div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

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
