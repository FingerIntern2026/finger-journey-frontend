// 역할: 완주 리포트 화면(PTH_CPL_P03)에 필요한 리포트와 3행시를 서버에서 불러온다.
//       - 완성된(COMPLETED) 리포트가 있으면 그대로 보여준다.
//       - 없거나(CPL_004), 이전 생성이 실패(FAILED)했거나 생성 중(GENERATING)으로 멈춰 있으면 새로 생성한다.
//         서버는 실패한 리포트의 재시도를 허용한다.
//       - 생성하는 사이 다른 요청이 먼저 완성했다면(CPL_005) 다시 조회한다.
//       - AI 서버 문제로 생성에 실패하면 서버가 FAILED로 돌려주므로, 빈 리포트 대신 오류와 "다시 시도"를 보여준다.
//       - employeeId가 없는 미리보기 상태에서는 예시 데이터를 보여준다.
// 사용처: PTH_CPL_P03.jsx
// 담당자: 김재웅

import { useEffect, useState } from "react";
import { fetchPoem, fetchReportDetail, generateReport } from "../../../../api/reportApi";
import { parseApiError } from "../../../../utils/apiErrorUtils";
import { COMPLETION_MOCK_REPORT, createMockPoemLines } from "./completionMockData";

const COMPLETED = "COMPLETED";

async function loadReport(employeeId) {
  let report = null;
  try {
    report = await fetchReportDetail(employeeId);
  } catch (err) {
    if (parseApiError(err).code !== "CPL_004") throw err;
  }
  if (report?.status === COMPLETED) return report;

  try {
    report = await generateReport(employeeId);
  } catch (err) {
    if (parseApiError(err).code !== "CPL_005") throw err;
    report = await fetchReportDetail(employeeId);
  }

  if (report?.status !== COMPLETED) {
    throw new Error("AI 리포트를 만들지 못했어요. 잠시 후 다시 시도해주세요.");
  }
  return report;
}

export default function useCompletionReport(employeeId, fallbackLines) {
  const isPreview = !employeeId;
  const [state, setState] = useState({ status: "loading", report: null, poemLines: [], errorMessage: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (isPreview) return undefined;
    let cancelled = false;

    Promise.all([
      loadReport(employeeId),
      fetchPoem(employeeId).catch(() => null),
    ])
      .then(([report, poem]) => {
        if (cancelled) return;
        // 저장된 3행시를 못 가져오면 직전 화면에서 넘어온 3행시로 대신한다.
        const poemLines = poem?.lines?.length
          ? poem.lines
          : (fallbackLines ?? []).map((text, index) => ({ letter: report.employeeName?.[index] ?? "", text }));
        setState({ status: "ready", report, poemLines, errorMessage: "" });
      })
      .catch((err) => {
        if (!cancelled) setState({ status: "error", report: null, poemLines: [], errorMessage: parseApiError(err).message });
      });

    return () => {
      cancelled = true;
    };
  }, [employeeId, isPreview, fallbackLines, attempt]);

  // "다시 시도": 로딩 상태로 돌린 뒤 처음부터 다시 불러온다.
  const retry = () => {
    setState({ status: "loading", report: null, poemLines: [], errorMessage: "" });
    setAttempt((count) => count + 1);
  };

  if (isPreview) {
    return { status: "ready", report: COMPLETION_MOCK_REPORT, poemLines: createMockPoemLines(fallbackLines), errorMessage: "", retry };
  }
  return { ...state, retry };
}
