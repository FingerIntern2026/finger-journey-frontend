// 역할: 백엔드의 체크인(가방싸기) API를 호출. 백엔드 요청만 담당하고 응답의 data만 돌려준다.
// 사용처: useBagGate.js, CHK_FIN_P01.jsx
// 담당자: 김재웅

import { sendPost } from "../utils/apiRequestUtils";

// 전체 항목과 내 진행 상태: [{ checkTypeId, checkName, iconMediaUrl, displayOrder, status }]
export async function fetchBagList() {
  const res = await sendPost("/bag/list", {});
  return res.data;
}

// HR의 확인 결과가 반영됐는지 보기 위한 항목별 최신 상태: [{ checkTypeId, status, checkedAt }]
export async function fetchBagStatus() {
  const res = await sendPost("/bag/status", {});
  return res.data;
}

// 항목에 진입(NOT_STARTED -> IN_PROGRESS). 이때부터 HR 화면에 "확인 대기"로 보인다.
export async function enterBagItem(checkTypeId) {
  const res = await sendPost("/bag/enter", { checkTypeId });
  return res.data;
}

// 모든 항목이 확인 완료일 때만 성공하고, 사원의 단계를 ONBOARDING으로 바꾼다. 아니면 BAG_001.
export async function completeBag() {
  const res = await sendPost("/bag/complete", {});
  return res.data;
}
