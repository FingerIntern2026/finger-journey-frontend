// 역할: 화면 전역에서 "지금 API 요청이 진행 중인지"를 세는 zustand 스토어. 여러 요청이 동시에
//       나가도 로딩바는 하나만 떠야 하므로, 켜고 끄는 게 아니라 진행 중인 요청 개수(count)를
//       세서 0이 될 때만 로딩이 끝난 걸로 처리함.
// 사용처: client.js, useGlobalLoading.js, ComponentListPage.jsx (로딩 테스트 버튼)
// 담당자:

import { create } from 'zustand';

export const useLoadingStore = create((set) => ({
  count: 0,
  startLoading: () => set((s) => ({ count: s.count + 1 })),
  stopLoading: () => set((s) => ({ count: Math.max(0, s.count - 1) })),
}));

// client.js의 axios 인터셉터처럼 React 컴포넌트가 아닌 곳에서도 호출해야 하므로,
// 훅(useLoadingStore) 대신 getState()로 액션만 꺼내 쓰는 함수형 래퍼를 그대로 유지한다.
// (이 파일을 쓰는 다른 모든 코드는 startLoading()/stopLoading()을 함수처럼 호출만 하므로 영향 없음)
export const startLoading = () => useLoadingStore.getState().startLoading();
export const stopLoading = () => useLoadingStore.getState().stopLoading();
