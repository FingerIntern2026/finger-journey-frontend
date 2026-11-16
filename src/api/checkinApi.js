// 역할: 백엔드의 체크인 API를 호출. 백엔드 요청만 담당한다.
// 사용처: CHK_INT_P01.jsx
// 담당자: 김재웅

import { sendPost } from "../utils/apiRequestUtils";

// 체크인 비밀번호 확인. 맞으면 그대로 끝나고, 틀리면 CHK_001 오류로 reject 된다.
export async function verifyCheckinPassword(password) {
  await sendPost("/checkin/password/verify", { password });
}
