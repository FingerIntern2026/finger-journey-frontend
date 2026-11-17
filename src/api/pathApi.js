// 역할: 백엔드의 온보딩 오솔길(스테이지) API를 호출. 백엔드 요청만 담당하고 응답의 data만 돌려준다.
//       로그인 토큰은 api/client.js가 모든 요청에 자동으로 붙여준다.
// 사용처: pathStore.js, pathService.js, PathMap.jsx
// 담당자: 김재웅

import { sendPost } from "../utils/apiRequestUtils";

// 전체 스테이지와 로그인 사원의 진행 상태: [{ stageId, stageName, stageOrder, status }]
export async function fetchPathMap() {
  const res = await sendPost("/path/map", {});
  return res.data;
}

// 스테이지 진입. 이전 스테이지를 끝내지 않았으면 PTH_001 오류로 reject 된다.
export async function enterStage(stageId) {
  const res = await sendPost("/path/stage/enter", { stageId });
  return res.data;
}

// 진입한 스테이지를 완료 처리. 마지막 스테이지를 끝내면 서버가 사원의 단계를 COMPLETED로 바꾼다.
export async function clearStage(stageId) {
  const res = await sendPost("/path/stage/clear", { stageId });
  return res.data;
}
