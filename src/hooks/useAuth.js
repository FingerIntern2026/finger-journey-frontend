// useAuth.js의 역할
// 현재 로그인 여부를 확인하는 커스텀 훅. 실제 서버 인증이 아니라
// localStorage에 저장된 값을 읽어 로그인 상태를 흉내내는 데모용 로직
// localStorage 읽기/쓰기 자체는 utils/authStorage.js로 통일 (MoveGuidePage.jsx도 동일하게 사용)

import { getIsLoggedIn } from '../utils/authStorage';

export function useAuth() {
    const isLoggedIn = getIsLoggedIn();

    // 이 훅을 쓰는 컴포넌트가 const { isLoggedIn } = useAuth() 형태로 꺼내 쓸 수 있게 객체로 반환
    return { isLoggedIn };
}