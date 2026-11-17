// 역할: 스테이지를 끝낼 때 서버에 완료를 알리는 공통 동작.
//       화면 8곳(핑거 이야기 ~ 레벨업)의 "완료" 버튼이 같은 동작을 쓰도록 한 곳에 모았다.
// 사용처: 각 스테이지의 Clear 화면 페이지(PTH_STR_P07 등)
// 담당자: 김재웅

import { clearStage, enterStage } from "../api/pathApi";
import usePathStore from "../stores/pathStore";

// stageOrder번째 스테이지를 완료 처리하고, 진행 상태를 다시 불러온다.
// 발표용 이동 패널로 바로 들어온 경우처럼 아직 진입 기록이 없을 수 있어서 진입을 먼저 시도한다.
export async function completeStage(stageOrder) {
  const stages = await usePathStore.getState().ensureLoaded();
  const stage = stages.find((item) => item.stageOrder === stageOrder);
  if (!stage) throw new Error("스테이지 정보를 찾을 수 없어요.");

  await enterStage(stage.stageId);
  await clearStage(stage.stageId);
  await usePathStore.getState().load();
}
