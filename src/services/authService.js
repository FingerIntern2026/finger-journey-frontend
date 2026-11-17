import { sendPost } from '../utils/apiRequestUtils';
import useAuthStore from '../stores/authStore';

export async function login(employeeNo, birthDate) {
  // 화면은 생년월일을 8자리(YYYYMMDD)로 받지만, 로그인 API는 6자리(YYMMDD)만 받는다.
  // 그래서 서버로 보내기 전에 앞의 연도 두 자리(세기)를 뺀다. (예: 19900101 -> 900101)
  const birthDateForServer = birthDate.length === 8 ? birthDate.slice(2) : birthDate;
  const response = await sendPost('/api/auth/login', { empNo: employeeNo, birthDate: birthDateForServer });
  const session = response.data;
  if (!session?.accessToken || !session?.refreshToken || !session?.redirectScreen) {
    throw new Error('로그인 응답을 확인해주세요.');
  }
  useAuthStore.getState().setSession(session);
  return session;
}
let restorePromise;
export function restoreSession() {
  if (!restorePromise) restorePromise = checkSession().finally(() => { restorePromise = null; });
  return restorePromise;
}
async function checkSession() {
  if (!useAuthStore.getState().session?.accessToken) return;
  try {
    const { data } = await sendPost('/api/auth/session');
    const session = useAuthStore.getState().session;
    if (session) useAuthStore.getState().setSession({ ...session, ...data });
  } catch (error) {
    // 일시적인 서버/네트워크 장애로 인증 정보를 삭제하지 않는다.
    if (error.response?.status === 401 || !useAuthStore.getState().session) {
      useAuthStore.getState().setSession(null);
      return;
    }
    throw error;
  }
}
export async function logout() {
  try {
    if (useAuthStore.getState().session) await sendPost('/api/auth/logout');
  } finally {
    useAuthStore.getState().setSession(null);
  }
}
