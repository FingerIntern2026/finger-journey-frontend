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

// axios 인스턴스 생성 (기본 주소 미리 설정해둠)
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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