// 역할: 백엔드의 관리자 API(사원·조직·직급·진행현황)를 호출. 백엔드 요청만 담당하고 응답의 data만 돌려준다.
//       로그인 토큰은 api/client.js가 모든 요청에 자동으로 붙여준다.
// 사용처: useOnboardingEmployees.js, AdminProgress.jsx
// 담당자: 김재웅

import { sendPost } from "../utils/apiRequestUtils";

// 사원: 목록 / 상세 / 등록 / 수정 / 삭제
export async function fetchEmployees() {
  const res = await sendPost("/admin/employee/list", {});
  return res.data;
}

export async function fetchEmployeeDetail(employeeId) {
  const res = await sendPost("/admin/employee/detail", { employeeId });
  return res.data;
}

export async function createEmployee(body) {
  const res = await sendPost("/admin/employee/create", body);
  return res.data;
}

export async function updateEmployee(body) {
  const res = await sendPost("/admin/employee/update", body);
  return res.data;
}

// 성공하면 응답 본문이 없다(HTTP 200만 내려옴).
export async function deleteEmployee(employeeId) {
  await sendPost("/admin/employee/delete", { employeeId });
}

// 조직·직급 목록 (사원 등록/수정 폼의 선택지)
export async function fetchOrganizations() {
  const res = await sendPost("/admin/org/list", {});
  return res.data;
}

export async function fetchPositions() {
  const res = await sendPost("/admin/position/list", {});
  return res.data;
}

// 가방싸기: 입사자의 항목별 상태 조회 / 항목 확인 처리(IN_PROGRESS → COMPLETED)
export async function fetchBagChecklist(employeeId) {
  const res = await sendPost("/admin/bag/checklist", { employeeId });
  return res.data;
}

export async function confirmBagCheck(employeeId, checkTypeId) {
  const res = await sendPost("/admin/bag/confirm", { employeeId, checkTypeId });
  return res.data;
}

// 위키: 카테고리 등록·삭제, 항목 등록·수정·삭제 (목록·상세 조회는 사용자용 wikiApi.js를 같이 쓴다)
export async function createWikiCategory(body) {
  const res = await sendPost("/admin/wiki/category/create", body);
  return res.data;
}

// 하위 항목이 남아 있으면 WIK_004 오류로 reject 된다.
export async function deleteWikiCategory(categoryId) {
  await sendPost("/admin/wiki/category/delete", { categoryId });
}

export async function createWikiItem(body) {
  const res = await sendPost("/admin/wiki/item/create", body);
  return res.data;
}

// mediaId를 보내면 이미지를 통째로 교체하고, 안 보내면 이미지는 그대로 둔다.
export async function updateWikiItem(body) {
  const res = await sendPost("/admin/wiki/item/update", body);
  return res.data;
}

export async function deleteWikiItem(itemId) {
  await sendPost("/admin/wiki/item/delete", { itemId });
}

// 이미지 업로드(multipart). 서버가 파일을 저장하고 { mediaId, fileUrl }을 돌려준다.
// 공통 axios의 기본 Content-Type이 application/json이라, 그대로 두면 파일이 JSON으로 바뀌어 전송된다.
// 그래서 multipart/form-data를 명시하면 브라우저가 파일 경계(boundary)까지 붙여서 보낸다.
export async function uploadMedia(file, mediaType = "IMAGE") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("mediaType", mediaType);
  const res = await sendPost("/admin/media/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// 체크인 비밀번호(전체 공통) 설정. 성공하면 응답 data는 없다.
export async function updateCheckinPassword(password) {
  await sendPost("/admin/checkin/password/update", { password });
}

// 진행현황: organizationId를 주면 그 조직만, 안 주면 전체
export async function fetchProgress(organizationId) {
  const res = await sendPost("/admin/progress/list", organizationId ? { organizationId } : {});
  return res.data;
}
