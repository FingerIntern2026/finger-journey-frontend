// 역할: 오솔길 스테이지 목록과 내 진행 상태를 서버에서 한 번 받아 보관한다.
//       지도 화면과 모든 스테이지 화면의 진행 바가 같은 값을 쓰고, 스테이지를 끝낼 때마다 다시 불러온다.
//       다른 사원으로 로그인하면 이전 사원의 값을 쓰지 않도록 사원 ID와 함께 기억한다.
// 사용처: PathProgressHeader.jsx, PathMap.jsx, pathService.js
// 담당자: 김재웅

import { create } from "zustand";
import { fetchPathMap } from "../api/pathApi";
import useAuthStore from "./authStore";

const currentEmployeeId = () => useAuthStore.getState().session?.employeeId ?? null;

const usePathStore = create((set, get) => ({
  stages: [],
  loaded: false,
  ownerId: null,
  pending: null,

  // 서버에서 새로 불러온다. 같은 요청이 진행 중이면 그 요청을 같이 기다린다.
  load: () => {
    if (get().pending) return get().pending;

    const ownerId = currentEmployeeId();
    const pending = fetchPathMap()
      .then((stages) => {
        set({ stages, loaded: true, ownerId, pending: null });
        return stages;
      })
      .catch((error) => {
        set({ pending: null });
        throw error;
      });

    set({ pending });
    return pending;
  },

  // 이미 같은 사원의 값이 있으면 그대로 쓰고, 없으면 불러온다.
  ensureLoaded: () => {
    const { loaded, ownerId } = get();
    if (loaded && ownerId === currentEmployeeId()) return Promise.resolve(get().stages);
    return get().load();
  },
}));

export default usePathStore;
