// 역할: 백엔드 서버와 통신하는 공통 axios 인스턴스와 응답 인터셉터를 설정한다.
// 사용처: apiRequestUtils.js
// 담당자:

import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

// axios 인스턴스 생성 (기본 주소 미리 설정해둠)
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    // 9/23 백엔드 변경: 업무 흐름상 실패(CPL_003/CPL_005/QUZ_002 등)는 이제 HTTP 200 +
    // { success:false, errorCode, message }로 내려옴. axios는 2xx면 무조건 성공(then)으로
    // 보내버려서 이 상태로 두면 화면이 "성공"으로 착각하고 다음 단계로 진행해버림.
    // 그래서 여기서 success:false를 감지하면 강제로 reject해서, 어떤 HTTP 상태로 오든
    // 프론트 전역에서 항상 catch/parseApiError로 통일해서 처리되게 만듦
    if (response.data && response.data.success === false) {
      const businessError = new Error(response.data.message || "요청이 거부되었습니다.");
      businessError.response = response; // parseApiError가 err.response.data를 그대로 읽을 수 있게
      businessError.isBusinessLogicError = true;
      return Promise.reject(businessError);
    }

    return response;
  },
  (error) => Promise.reject(error)
);
