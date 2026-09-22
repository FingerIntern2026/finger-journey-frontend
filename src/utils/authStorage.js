// authStorage.js의 역할
// 로그인 상태를 localStorage에 읽고 쓰는 로직을 한 곳으로 모음
// 지금은 useAuth.js와 MoveGuidePage.jsx 두 곳에서 각자 'isLoggedIn' 키 문자열을
// 직접 쓰고 있어서, 키 이름이 어긋나면 두 곳이 서로 다른 값을 보게 되는 위험이 있었음
// 앞으로는 이 두 함수만 거쳐서 localStorage에 접근하도록 통일

import { traced } from '../devtrace/traced';

const LOGIN_KEY = 'isLoggedIn';

// 로그인 여부 읽기
// localStorage는 문자열만 저장하므로 'true' 문자열과 비교해 boolean으로 변환
function _getIsLoggedIn() {
    return localStorage.getItem(LOGIN_KEY) === 'true';
}

// 로그인 여부 저장
// boolean을 받아서 localStorage가 이해하는 문자열로 바꿔 저장
function _setIsLoggedIn(nextValue) {
    localStorage.setItem(LOGIN_KEY, String(nextValue));
}

// getIsLoggedIn은 useAuth()가 렌더마다(re-render마다) 호출하는 읽기 전용 함수라
// traced()로 감싸면 클릭 한 번과 무관하게 로그가 계속 쌓임 → 추적 안 함
// setIsLoggedIn은 토글 클릭 시에만 호출되는 실제 "쓰기" 동작이라 추적 대상으로 남김
export const getIsLoggedIn = _getIsLoggedIn;
export const setIsLoggedIn = traced('setIsLoggedIn', 'src/utils/authStorage.js', _setIsLoggedIn);
