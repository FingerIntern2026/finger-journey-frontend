// 역할: 서버의 오솔길 진행 상태로 "완료한 스테이지 수 / 전체"를 계산한다.
//       전체는 서버 스테이지 수에 마지막 숨은 스테이지(3행시·리포트) 1개를 더한 값이다. (지금 8 + 1 = 9)
//       서버에서 아직 못 받았거나 실패했으면 0/9로 보여준다.
// 사용처: PathProgressHeader.jsx, PathMap.jsx
// 담당자: 김재웅

import { useEffect } from "react";
import usePathStore from "../../../../stores/pathStore";

const FALLBACK_TOTAL = 9;

export default function usePathProgress() {
  const stages = usePathStore((state) => state.stages);
  const loaded = usePathStore((state) => state.loaded);

  useEffect(() => {
    usePathStore.getState().ensureLoaded().catch(() => {});
  }, []);

  const completed = stages.filter((stage) => stage.status === "COMPLETED").length;
  const total = loaded && stages.length > 0 ? stages.length + 1 : FALLBACK_TOTAL;
  return { completed, total, loaded };
}
