// 페이지명: ReportExamplePage (TODO: 정식 화면명 확정되면 교체)
// 역할: "완주 여정" 전체 흐름 데모 화면. 사원 ID 입력 → 퀴즈 9문항 답변 → 3행시 입력 →
//       AI 리포트 생성/조회까지 한 화면에서 순서대로 눌러볼 수 있게 이어붙임 (기존엔 리포트
//       생성 버튼 하나뿐이라 실제 사용자가 겪는 흐름이 안 보인다는 피드백을 받아 확장함).
//       리포트 생성/조회 결과는 이 화면에 이어붙이지 않고 ReportResultPage로 이동해서
//       보여줌 (한 페이지에 다 몰아넣지 말고 실제 리포트 화면처럼 페이지를 분리해달라는
//       요청 반영). 각 단계는 이전 단계 완료 여부와 무관하게 독립적으로 호출 가능
//       (데모 편의를 위해). 데모용 사원(data.sql 시드 기준) 4/5/6번은 퀴즈·3행시는 있고
//       리포트만 없음
// 사용처: DemoIndexPage에서 "⑤ 완주 여정 데모" 버튼(goTo(ROUTE_PATHS.DEMO_REPORT))으로 진입.
//         리포트 생성/조회 시 goTo(ROUTE_PATHS.DEMO_REPORT_RESULT, { employeeId })로
//         ReportResultPage로 이동
// url: /demo/report
// 담당자:

import { useState } from "react";
import { sendPost } from "../../api/client";
import { parseApiError } from "../../utils/apiError";
import BaseButton from "../../components/common/base/BaseButton";
import BaseInput from "../../components/common/base/BaseInput";
import AcrosticInputForm from "../../components/common/custom/AcrosticInputForm";
import PageLayout from "../../components/common/layout/PageLayout.jsx";
import Header from "../../components/common/layout/Header.jsx";
import useNavigation from "../../hooks/useNavigation";
import { ROUTE_PATHS } from "../../config/routeConfig";
import styles from "./reportExample.module.css";

export default function ReportExamplePage() {
  const { goBack, goTo } = useNavigation();

  const [employeeId, setEmployeeId] = useState("4");
  const [employeeName, setEmployeeName] = useState("");

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { [quizId]: selectedOption }
  const [quizMessage, setQuizMessage] = useState(null);
  const [quizError, setQuizError] = useState(null);

  const [poemMessage, setPoemMessage] = useState(null);
  const [poemError, setPoemError] = useState(null);

  const [reportError, setReportError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1단계: 사원 ID로 이름 불러오기 (3행시 글자수 계산에 실제 이름을 써야 해서 필요)
  const handleLoadEmployee = async () => {
    setReportError(null);
    try {
      const response = await sendPost("/admin/employee/detail", {
        employeeId: Number(employeeId),
      });
      setEmployeeName(response.data.name);
    } catch (err) {
      setEmployeeName("");
      setReportError(parseApiError(err));
    }
  };

  // 2단계: 퀴즈 9문항 불러오기
  const handleLoadQuiz = async () => {
    setQuizError(null);
    setQuizMessage(null);
    try {
      const response = await sendPost("/quiz/questions", {});
      setQuizQuestions(response.data);
      setAnswers({});
    } catch (err) {
      setQuizError(parseApiError(err));
    }
  };

  const handleSelectOption = (quizId, option) => {
    setAnswers((prev) => ({ ...prev, [quizId]: option }));
  };

  // 2단계: 답변 저장 (문항별 선택값 일괄 저장)
  const handleSaveQuizAnswers = async () => {
    setQuizError(null);
    setQuizMessage(null);
    try {
      const response = await sendPost("/quiz/answers", {
        employeeId: Number(employeeId),
        answers: Object.entries(answers).map(([quizId, selectedOption]) => ({
          quizId: Number(quizId),
          selectedOption,
        })),
      });
      setQuizMessage(`${response.data.savedCount}개 문항 저장 완료`);
    } catch (err) {
      setQuizError(parseApiError(err));
    }
  };

  // 4단계: 리포트 생성 → 성공하면 결과 화면(ReportResultPage)으로 이동
  const handleGenerate = async () => {
    setReportError(null);
    setLoading(true);
    try {
      await sendPost("/api/reports/generate", { employeeId: Number(employeeId) });
      goTo(ROUTE_PATHS.DEMO_REPORT_RESULT, { employeeId: Number(employeeId) });
    } catch (err) {
      setReportError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // 4단계: 이미 생성된 리포트가 있는지 확인만 하고, 있으면 바로 결과 화면으로 이동
  const handleViewReport = () => {
    goTo(ROUTE_PATHS.DEMO_REPORT_RESULT, { employeeId: Number(employeeId) });
  };

  const allAnswered = quizQuestions.length > 0 && quizQuestions.every((q) => answers[q.quizId]);

  return (
    <PageLayout header={<Header label="완주 여정 데모" onBack={goBack} />}>
      <div style={{ padding: 24 }}>

        {/* 0단계: 사원 선택 */}
        <div className={styles.card}>
          <h3>① 사원 선택</h3>
          <p className={styles.controlHint}>
            4·5·6번은 퀴즈/3행시가 이미 있고 리포트만 없어서 라이브 생성 데모에 좋아요.
          </p>
          <BaseInput
            label="사원 ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <BaseButton label="이름 불러오기" onClick={handleLoadEmployee} />
          {employeeName && <p className={styles.controlHint}>→ {employeeName}님</p>}
        </div>

        {/* 1단계: 퀴즈 */}
        <div className={styles.card}>
          <h3>② 징검다리 퀴즈</h3>
          <BaseButton label="퀴즈 문항 불러오기" onClick={handleLoadQuiz} />

          {quizQuestions.length > 0 && (
            <div style={{ marginTop: 14 }}>
              {quizQuestions.map((q) => (
                <div key={q.quizId} style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 6 }}>
                    {q.displayOrder}. {q.question}
                  </p>
                  <div className={styles.quizOptionRow}>
                    {[q.option1, q.option2, q.option3, q.option4].map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`${styles.quizOptionButton} ${
                          answers[q.quizId] === option ? styles.quizOptionButtonSelected : ""
                        }`}
                        onClick={() => handleSelectOption(q.quizId, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <BaseButton
                label="답변 저장하기"
                onClick={handleSaveQuizAnswers}
                disabled={!allAnswered}
              />
            </div>
          )}

          {quizMessage && <p className={styles.controlHint}>✓ {quizMessage}</p>}
          {quizError && (
            <div className={styles.errorCard} style={{ marginTop: 10 }}>
              <p className={styles.errorCode}>{quizError.code}</p>
              <p className={styles.errorMessage}>{quizError.message}</p>
            </div>
          )}
        </div>

        {/* 2단계: 3행시 */}
        <div className={styles.card}>
          <h3>③ 완주 3행시</h3>
          {employeeName ? (
            <AcrosticInputForm
              name={employeeName}
              apiUrl="/complete/poem"
              extraBody={{ employeeId: Number(employeeId) }}
              onSuccess={() => setPoemMessage("3행시 저장 완료")}
            />
          ) : (
            <p className={styles.controlHint}>먼저 ①에서 이름을 불러와주세요.</p>
          )}
          {poemMessage && <p className={styles.controlHint}>✓ {poemMessage}</p>}
          {poemError && (
            <div className={styles.errorCard} style={{ marginTop: 10 }}>
              <p className={styles.errorMessage}>{poemError.message}</p>
            </div>
          )}
        </div>

        {/* 3단계: 리포트 생성/조회 (누르면 별도 화면으로 이동) */}
        <div className={styles.card}>
          <h3>④ AI 완주 리포트</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <BaseButton
              label={loading ? "처리 중..." : "리포트 생성"}
              onClick={handleGenerate}
              disabled={loading || !employeeId}
            />
            <BaseButton
              label="기존 리포트 조회"
              variant="secondary"
              onClick={handleViewReport}
              disabled={loading || !employeeId}
            />
          </div>
        </div>

        {reportError && (
          <div className={styles.errorCard}>
            <p className={styles.errorCode}>{reportError.code}</p>
            <p className={styles.errorMessage}>{reportError.message}</p>
          </div>
        )}

      </div>
    </PageLayout>
  );
}
