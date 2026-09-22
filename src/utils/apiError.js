// apiError.js의 역할
// 백엔드는 실패 시 항상 { success:false, code, message } 형태로 응답하기로 정했음
// (finger-journey-backend의 GlobalExceptionHandler, ErrorResponse 참고)
// 지금은 페이지마다 err.response?.data ?? err.message 를 각자 따로 쓰고 있어서
// (예: ApiExamplePage.jsx, AcrosticInputForm.jsx) 이 함수 하나로 통일

import { traced } from '../devtrace/traced';

// axios가 던진 에러(err)를 받아서 { code, message } 형태로 정리해서 돌려줌
// - 서버가 정상적으로 응답은 했지만 실패인 경우(err.response.data) -> 그 안의 code/message 그대로 사용
// - 서버 응답 자체를 못 받은 경우(네트워크 끊김 등) -> code는 없고 err.message만 사용
function _parseApiError(err) {
    const data = err.response?.data;

    if (data) {
        return {
            code: data.code ?? null,
            message: data.message ?? '알 수 없는 오류가 발생했습니다.',
        };
    }

    return {
        code: null,
        message: err.message ?? '알 수 없는 오류가 발생했습니다.',
    };
}

export const parseApiError = traced('parseApiError', 'src/utils/apiError.js', _parseApiError);
