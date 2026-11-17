// 역할: 징검다리 퀴즈의 서버 연동. 문항 ID와 내가 이미 답한 문항을 불러오고, 한 묶음(3문항)의 답을 저장한다.
//       화면의 문항(quizData.js)은 순서대로 서버 문항 1~9번에 대응한다.
//       (음식 3개 → 1~3번, 휴식 3개 → 4~6번, 협업 3개 → 7~9번)
// 사용처: PathMap.jsx
// 담당자: 김재웅

import { useCallback, useEffect, useState } from "react";
import { fetchMyQuizAnswers, fetchQuizQuestions, saveQuizAnswers } from "../../../../api/quizApi";
import useAuthStore from "../../../../stores/authStore";
import { parseApiError } from "../../../../utils/apiErrorUtils";

// 화면 문항 코드 -> 서버 문항 순서(displayOrder)
const ORDER_BY_CODE = {
  PTH_QUZ_C01: 1, PTH_QUZ_C02: 2, PTH_QUZ_C03: 3,
  PTH_QUZ_C05: 4, PTH_QUZ_C06: 5, PTH_QUZ_C07: 6,
  PTH_QUZ_C09: 7, PTH_QUZ_C10: 8, PTH_QUZ_C11: 9,
};

// 지도에서 퀴즈를 시작하는 코드 -> 그 묶음의 문항 코드들
export const QUIZ_GROUPS = {
  PTH_QUZ_C01: ["PTH_QUZ_C01", "PTH_QUZ_C02", "PTH_QUZ_C03"],
  PTH_QUZ_C05: ["PTH_QUZ_C05", "PTH_QUZ_C06", "PTH_QUZ_C07"],
  PTH_QUZ_C09: ["PTH_QUZ_C09", "PTH_QUZ_C10", "PTH_QUZ_C11"],
};

// 서버 응답을 화면에서 쓰는 형태로: 문항 순서 -> 문항 ID, 내가 답한 문항 ID 모음
const toState = (questions, answers) => ({
  idByOrder: Object.fromEntries(questions.map((question) => [question.displayOrder, question.quizId])),
  answeredIds: new Set(answers.map((answer) => answer.quizId)),
  loaded: true,
});

export default function useQuizProgress() {
  const employeeId = useAuthStore((state) => state.session?.employeeId);
  const [state, setState] = useState({ idByOrder: {}, answeredIds: new Set(), loaded: false });

  // 못 불러오면 퀴즈는 완료 표시 없이 열린다. 저장할 때 서버가 다시 확인한다.
  const load = useCallback(() => (
    Promise.all([fetchQuizQuestions(), fetchMyQuizAnswers(employeeId)])
      .then(([questions, answers]) => setState(toState(questions, answers)))
      .catch(() => {})
  ), [employeeId]);

  useEffect(() => {
    if (!employeeId) return undefined;
    let cancelled = false;

    Promise.all([fetchQuizQuestions(), fetchMyQuizAnswers(employeeId)])
      .then(([questions, answers]) => {
        if (!cancelled) setState(toState(questions, answers));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [employeeId]);

  // 묶음의 문항을 모두 답했는지
  const isGroupDone = (startCode) => {
    const codes = QUIZ_GROUPS[startCode];
    if (!state.loaded || !codes) return false;
    return codes.every((code) => state.answeredIds.has(state.idByOrder[ORDER_BY_CODE[code]]));
  };

  // 한 묶음의 답 [{ code, option }]을 저장한다. 이미 저장돼 있으면(QUZ_002) 저장된 것으로 본다.
  const saveGroup = async (answers) => {
    if (!employeeId) return;

    const questions = state.loaded ? state : null;
    let idByOrder = questions?.idByOrder;
    if (!idByOrder) {
      const fetched = await fetchQuizQuestions();
      idByOrder = Object.fromEntries(fetched.map((question) => [question.displayOrder, question.quizId]));
    }

    try {
      await saveQuizAnswers(employeeId, answers.map(({ code, option }) => ({
        quizId: idByOrder[ORDER_BY_CODE[code]],
        selectedOption: option,
      })));
    } catch (err) {
      if (parseApiError(err).code !== "QUZ_002") throw err;
    }

    await load();
  };

  return { isGroupDone, saveGroup };
}
