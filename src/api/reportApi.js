// 역할: 백엔드의 완주 리포트·3행시 API를 호출. 백엔드 요청만 담당하고 응답의 data만 돌려준다.
// 사용처: useCompletionReport.js
// 담당자: 김재웅

import { sendPost } from "../utils/apiRequestUtils";

// 이미 만들어진 리포트 조회. 없으면 CPL_004 오류로 reject 된다.
export async function fetchReportDetail(employeeId) {
  const res = await sendPost("/api/reports/detail", { employeeId });
  return res.data;
}

// 리포트 생성(AI 서버 호출). 이미 있으면 CPL_005, 퀴즈·3행시가 부족하면 CPL_003 오류로 reject 된다.
export async function generateReport(employeeId) {
  const res = await sendPost("/api/reports/generate", { employeeId });
  return res.data;
}

// 저장된 3행시 조회: { lines: [{ letter, text }] }
export async function fetchPoem(employeeId) {
  const res = await sendPost("/complete/poem/my", { employeeId });
  return res.data;
}
