// useGlobalLoading.js의 역할
// utils/loadingStore.js가 들고 있는 "지금 로딩 중인지" 값을
// React 컴포넌트가 구독해서 쓸 수 있게 이어주는 커스텀 훅
// useAuth.js가 authStorage.js를 읽어오는 것과 같은 역할이지만,
// 이건 값이 바뀔 때마다 컴포넌트가 다시 그려져야 해서 구독(subscribe) 방식을 씀

import { useSyncExternalStore } from "react";
import { subscribe, isLoading } from "../utils/loadingStore";

export function useGlobalLoading() {
  // useSyncExternalStore(구독함수, 현재값을 읽는 함수)
  // loadingStore의 count가 바뀌어서 notify()가 호출되면
  // 이 훅을 쓰는 컴포넌트가 자동으로 리렌더링됨
  const loading = useSyncExternalStore(subscribe, isLoading);

  return loading;
}