// 역할: 완주 리포트 화면(PTH_CPL_P03)에 필요한 리포트와 3행시를 서버에서 불러온다.
//       - 이미 만든 리포트가 있으면 그대로 조회하고, 없을 때(CPL_004)만 새로 생성한다.
//       - 생성하는 사이 다른 요청이 먼저 만들었다면(CPL_005) 다시 조회한다.
//       - employeeId가 없는 미리보기 상태에서는 예시 데이터를 보여준다.
// 사용처: PTH_CPL_P03.jsx
// 담당자: 김재웅

import { useEffect, useState } from "react";
import { fetchPoem, fetchReportDetail, generateReport } from "../../../../api/reportApi";
import { parseApiError } from "../../../../utils/apiErrorUtils";
import { COMPLETION_MOCK_REPORT, createMockPoemLines } from "./completionMockData";

async function loadReport(employeeId) {
  try {
    return await fetchReportDetail(employeeId);
  } catch (err) {
    if (parseApiError(err).code !== "CPL_004") throw err;
  }

  try {
    return await generateReport(employeeId);
  } catch (err) {
    if (parseApiError(err).code !== "CPL_005") throw err;
    return fetchReportDetail(employeeId);
  }
}

export default function useCompletionReport(employeeId, fallbackLines) {
  const isPreview = !employeeId;
  const [state, setState] = useState({ status: "loading", report: null, poemLines: [], errorMessage: "" });

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
  }, [employeeId, isPreview, fallbackLines]);

  if (isPreview) {
    return { status: "ready", report: COMPLETION_MOCK_REPORT, poemLines: createMockPoemLines(fallbackLines), errorMessage: "" };
  }
  return state;
}
