// authStorage.js의 역할
// 로그인 상태를 localStorage에 읽고 쓰는 로직을 한 곳으로 모음
// 지금은 useAuth.js와 MoveGuidePage.jsx 두 곳에서 각자 'isLoggedIn' 키 문자열을
// 직접 쓰고 있어서, 키 이름이 어긋나면 두 곳이 서로 다른 값을 보게 되는 위험이 있었음
// 앞으로는 이 두 함수만 거쳐서 localStorage에 접근하도록 통일

const LOGIN_KEY = 'isLoggedIn';

// 로그인 여부 읽기
// localStorage는 문자열만 저장하므로 'true' 문자열과 비교해 boolean으로 변환
export function getIsLoggedIn() {
    return localStorage.getItem(LOGIN_KEY) === 'true';
}

// 로그인 여부 저장
// boolean을 받아서 localStorage가 이해하는 문자열로 바꿔 저장
export function setIsLoggedIn(nextValue) {
    localStorage.setItem(LOGIN_KEY, String(nextValue));
}
