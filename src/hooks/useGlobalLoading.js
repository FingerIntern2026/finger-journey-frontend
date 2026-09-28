// 역할: utils/loadingStore.js(zustand)의 "지금 로딩 중인지" 값을 React 컴포넌트가 구독해서
//       쓸 수 있게 이어주는 커스텀 훅. count가 바뀔 때마다 컴포넌트가 다시 그려지게 함
// 사용처: GlobalLoading.jsx
// 담당자:

import { useLoadingStore } from "../utils/loadingStore";

export function useGlobalLoading() {
  return useLoadingStore((s) => s.count > 0);
}
