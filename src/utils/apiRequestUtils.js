// 역할: 공통 axios 인스턴스로 GET/POST 요청을 보내고 전역 로딩 상태를 함께 관리한다.
//       요청 성공/실패와 관계없이 try/finally로 로딩 카운트를 반드시 줄인다.
// 사용처: screenApi.js, AcrosticInputForm.jsx, HrPoem.jsx
// 담당자: 김재웅

import { apiClient } from "../api/client";
import { startLoading, stopLoading } from "../stores/loadingStore";

export const sendPost = async (url, data) => {
  startLoading();
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } finally {
    stopLoading();
  }
};

export const sendGet = async (url, params) => {
  startLoading();
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } finally {
    stopLoading();
  }
};
