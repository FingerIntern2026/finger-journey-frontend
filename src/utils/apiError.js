// 역할: 백엔드는 실패 시 { success:false, data:null, errorCode, message } 형태로 응답함
//       (finger-journey-backend의 GlobalExceptionHandler, ErrorResponseDto 참고).
//       9/23부터 업무 흐름상 실패(CPL_003/CPL_005/QUZ_002 등)는 HTTP 200으로도 내려오는데,
//       api/client.js의 axios 인터셉터가 success:false를 감지해 강제로 reject 처리해두므로
//       이 함수 입장에서는 HTTP 상태와 무관하게 항상 err.response.data를 읽으면 됨.
//       필드명이 원래 code였다가 errorCode로 바뀌어서 구버전 응답도 대비해 둘 다 확인
// 사용처: screenConfig.js, ReportExamplePage.jsx, ReportResultPage.jsx
// 담당자:

import { traced } from '../devtrace/traced';

// axios가 던진 에러(err)를 받아서 { code, message } 형태로 정리해서 돌려줌
// - 서버가 정상적으로 응답은 했지만 실패인 경우(err.response.data) -> 그 안의 code/message 그대로 사용
// - 서버 응답 자체를 못 받은 경우(네트워크 끊김 등) -> code는 없고 err.message만 사용
function _parseApiError(err) {
    const data = err.response?.data;

    if (data) {
        return {
            code: data.errorCode ?? data.code ?? null,
            message: data.message ?? '알 수 없는 오류가 발생했습니다.',
        };
    }

    return {
        code: null,
        message: err.message ?? '알 수 없는 오류가 발생했습니다.',
    };
}

export const parseApiError = traced('parseApiError', 'src/utils/apiError.js', _parseApiError);
