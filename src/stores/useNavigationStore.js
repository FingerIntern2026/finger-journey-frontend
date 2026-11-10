// 역할: 화면 코드 기반 이동과 브라우저 URL에 대응하는 현재 화면 상태를 전역으로 관리한다.
// 사용처: AppRoutes와 화면 내 이전·다음 이동 처리
// 담당자: 김재웅

import { create } from "zustand";
import { findScreenByCode } from "../services/screenService";

const EMPTY_PAGE_PARAMS = {
  path: "/",
  params: {},
  preParams: {},
};

function createHistoryState(params = {}, navigationIndex = 0) {
  return {
    fingerJourney: true,
    navigationIndex,
    params: { ...params },
  };
}

const useNavigationStore = create((set, get) => ({
  nowPageParams: EMPTY_PAGE_PARAMS,
  historyIndex: 0,
  pendingBackParams: {},
  navigate: null,

  // 스토어 안에서는 useNavigate 훅을 호출할 수 없어서 App에서 navigate 함수를 전달받는다.
  setNavigate: (navigate) => {
    set({ navigate });
  },

  syncNavigation: ({ path, params = {}, navigationIndex = 0 }) => {
    if (!path) {
      return false;
    }

    set((state) => ({
      nowPageParams: {
        path,
        params: { ...params },
        preParams: { ...state.pendingBackParams },
      },
      historyIndex: navigationIndex,
      pendingBackParams: {},
    }));

    return true;
  },

  goForward: (screenCode, params = {}) => {
    const targetScreen = findScreenByCode(screenCode);
    if (!targetScreen) {
      return false;
    }

    const nextHistoryIndex = get().historyIndex + 1;

    get().navigate(targetScreen.routePath, {
      state: createHistoryState(params, nextHistoryIndex),
    });

    return true;
  },

  goBack: (num = 1, preParams = {}) => {
    // 버튼 핸들러에 goBack을 직접 넘긴 경우 React의 클릭 이벤트가 첫 인자로 올 수 있다.
    // 이벤트 때문에 이전 화면 이동이 막히지 않도록 그런 경우에는 기본값(한 단계)을 사용한다.
    const step = Number.isInteger(num) ? num : 1;

    if (step < 1) {
      return false;
    }

    if (get().historyIndex < step) {
      return false;
    }

    set({ pendingBackParams: { ...preParams } });
    get().navigate(-step);
    return true;
  },
}));

export default useNavigationStore;
