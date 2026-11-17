// 역할: 스테이지의 "완료" 버튼을 눌렀을 때, 서버에 스테이지 완료를 알리고 오솔길 지도로 돌아가는 동작.
//       서버가 거절하면(예: 이전 스테이지를 안 끝냄) 안내 문구를 보여주고, 지도에서 실제 상태를 확인하게 한다.
// 사용처: 각 스테이지의 Clear 화면 페이지(PTH_STR_P07 등 8곳)
// 담당자: 김재웅

import { useRef } from "react";
import { useDialog } from "./useDialog";
import useNavigation from "./useNavigation";
import { completeStage } from "../services/pathService";
import { parseApiError } from "../utils/apiErrorUtils";

export default function useStageClear(stageOrder) {
  const { goForward } = useNavigation();
  const { showAlert } = useDialog();
  const clearing = useRef(false);

  return async () => {
    if (clearing.current) return;
    clearing.current = true;

    try {
      await completeStage(stageOrder);
    } catch (err) {
      showAlert(parseApiError(err).message);
    } finally {
      clearing.current = false;
    }

    goForward("PTH_MAP_P01");
  };
}
