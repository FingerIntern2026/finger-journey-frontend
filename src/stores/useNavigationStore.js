// 역할: 현재 화면의 경로와 파라미터, 지나온 화면 목록을 전역으로 저장한다. 화면 이동은 hooks/useNavigation.js가 담당한다.
// 사용처: App.jsx, AppRoutes.jsx, useNavigation.js, 파라미터를 읽는 페이지
// 담당자: 김재웅

import { create } from "zustand";

const EMPTY_PAGE_PARAMS = {
  path: "/",
  params: {},
  preParams: {},
};

const useNavigationStore = create((set) => ({
  nowPageParams: EMPTY_PAGE_PARAMS,
  historyStack: [],
  pendingBackParams: {},

  setPendingBackParams: (preParams) => {
    set({ pendingBackParams: { ...preParams } });
  },

  syncNavigation: ({ path, params = {}, historyStack = [] }) => {
    if (!path) {
      return false;
    }

    set((state) => ({
      nowPageParams: {
        path,
        params: { ...params },
        preParams: { ...state.pendingBackParams },
      },
      historyStack,
      pendingBackParams: {},
    }));

    return true;
  },
}));

export default useNavigationStore;
