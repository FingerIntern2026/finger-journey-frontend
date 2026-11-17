// 역할: 백엔드의 징검다리 퀴즈 API를 호출. 백엔드 요청만 담당하고 응답의 data만 돌려준다.
// 사용처: useQuizProgress.js
// 담당자: 김재웅

import { sendPost } from "../utils/apiRequestUtils";

// 문항 9개: [{ quizId, question, option1~4, displayOrder }]
export async function fetchQuizQuestions() {
  const res = await sendPost("/quiz/questions", {});
  return res.data;
}

// 내 응답 저장: answers = [{ quizId, selectedOption }]. 이미 답한 문항이 섞여 있으면 QUZ_002로 전체가 거절된다.
export async function saveQuizAnswers(employeeId, answers) {
  const res = await sendPost("/quiz/answers", { employeeId, answers });
  return res.data;
}

// 내가 이미 답한 문항: [{ quizId, question, selectedOption }]
export async function fetchMyQuizAnswers(employeeId) {
  const res = await sendPost("/quiz/answers/my", { employeeId });
  return res.data;
}
