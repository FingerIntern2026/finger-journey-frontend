// 역할: 백엔드 서버와 통신하는 모든 요청이 거쳐가는 공통 창구. axios 인스턴스를 한 곳에서
//       설정(서버 주소, 헤더 등)해서 다른 파일에서는 sendGet/sendPost만 가져다 쓰면 됨.
//       전역 로딩 처리: 요청 시작 시 startLoading, 끝나면(성공/실패 무관) stopLoading을
//       try/finally로 감싸서 에러가 나도 로딩 카운트가 반드시 줄어들도록 보장
// 사용처: ReportExamplePage.jsx, ReportResultPage.jsx, AcrosticInputForm.jsx, screenConfig.js,
//         ApiExamplePage.jsx
// 담당자:

import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";
import { startLoading, stopLoading } from "../utils/loadingStore";
import { addStep, updateStep, markPending, safeSerialize } from "../devtrace/traceContext";
import { findEndpointKnowledge } from "../devtrace/knowledge";

// axios 인스턴스 생성 (기본 주소 미리 설정해둠)
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// DevTrace 계측: 요청 보낼 때 step을 하나 만들고, 응답(성공/실패) 오면 그 step을 채움
// config에 stepId/release를 실어서 요청-응답을 짝지음 (인터셉터는 요청/응답이 따로 호출되므로)
instance.interceptors.request.use((config) => {
  const knowledge = findEndpointKnowledge(config.url);
  config.__devtraceStartedAt = Date.now();
  config.__devtraceRelease = markPending();
  config.__devtraceStepId = addStep({
    layer: "api",
    label: `${config.method?.toUpperCase()} ${config.url}`,
    source: "src/api/client.js",
    input: safeSerialize(config.data),
    output: "(응답 대기 중...)",
    backend: knowledge?.backend ?? null,
    note: knowledge?.note ?? null,
  });
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const { __devtraceStepId, __devtraceStartedAt, __devtraceRelease } = response.config;

    // 9/23 백엔드 변경: 업무 흐름상 실패(CPL_003/CPL_005/QUZ_002 등)는 이제 HTTP 200 +
    // { success:false, errorCode, message }로 내려옴. axios는 2xx면 무조건 성공(then)으로
    // 보내버려서 이 상태로 두면 화면이 "성공"으로 착각하고 다음 단계로 진행해버림.
    // 그래서 여기서 success:false를 감지하면 강제로 reject해서, 어떤 HTTP 상태로 오든
    // 프론트 전역에서 항상 catch/parseApiError로 통일해서 처리되게 만듦
    if (response.data && response.data.success === false) {
      const knowledge = findEndpointKnowledge(response.config.url);
      const backendCode = response.data.errorCode;
      updateStep(__devtraceStepId, {
        output: safeSerialize(response.data),
        error: backendCode
          ? `${backendCode} (HTTP 200)${knowledge?.errors?.[backendCode] ? " — " + knowledge.errors[backendCode] : ""}`
          : safeSerialize(response.data.message),
        durationMs: Date.now() - __devtraceStartedAt,
      });
      __devtraceRelease?.();

      const businessError = new Error(response.data.message || "요청이 거부되었습니다.");
      businessError.response = response; // parseApiError가 err.response.data를 그대로 읽을 수 있게
      businessError.isBusinessLogicError = true;
      return Promise.reject(businessError);
    }

    updateStep(__devtraceStepId, {
      output: safeSerialize(response.data),
      durationMs: Date.now() - __devtraceStartedAt,
    });
    __devtraceRelease?.();
    return response;
  },
  (error) => {
    const config = error.config ?? {};
    const { __devtraceStepId, __devtraceStartedAt, __devtraceRelease } = config;
    if (__devtraceStepId) {
      const knowledge = findEndpointKnowledge(config.url);
      const backendCode = error.response?.data?.errorCode;
      updateStep(__devtraceStepId, {
        output: safeSerialize(error.response?.data),
        error: backendCode
          ? `${backendCode}${knowledge?.errors?.[backendCode] ? " — " + knowledge.errors[backendCode] : ""}`
          : safeSerialize(error.message),
        durationMs: Date.now() - __devtraceStartedAt,
      });
      __devtraceRelease?.();
    }
    return Promise.reject(error);
  }
);

// POST 요청 보내는 함수
export const sendPost = async (url, data) => {
  startLoading();
  try {
    const response = await instance.post(url, data);
    return response.data;
  } finally {
    stopLoading();
  }
};

// GET 요청 보내는 함수(post만 사용한다고 했지만 일단 남겨둠)
export const sendGet = async (url, params) => {
  startLoading();
  try {
    const response = await instance.get(url, { params });
    return response.data;
  } finally {
    stopLoading();
  }
};