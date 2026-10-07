// 역할: 백엔드의 화면정보 목록 API를 호출
// 백엔드 요청만 담당(sendPost("/admin/screen/list", {});)

import { sendPost } from "./client";

const SCREEN_LIST_API = "/admin/screen/list";

export function fetchScreens() {
  return sendPost(SCREEN_LIST_API, {});
}