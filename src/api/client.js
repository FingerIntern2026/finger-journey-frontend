// client.js의 역할
// 백엔드 서버와 통신하는 모든 요청이 거쳐가는 공통 창구
// axios 인스턴트를 한 곳에서 설정(서버 주소, 헤더 등)해서
// 다른 파일에서는 이 설정을 매번 반복하지 않고 sendGet/sendPost만 가져다 쓰면 됨
// 나중에 인증 토큰, 에러 처리 같은 공통 로직을 추가해도 이 파일만 고치면 됨

import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

// axios 인스턴스 생성 (기본 주소 미리 설정해둠)
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// POST 요청 보내는 함수
export const sendPost = async (url, data) => {
  const response = await instance.post(url, data);
  return response.data;
};

// GET 요청 보내는 함수(post만 사용한다고 했지만 일단 남겨둠)
export const sendGet = async (url, params) => {
  const response = await instance.get(url, { params });
  return response.data;
};