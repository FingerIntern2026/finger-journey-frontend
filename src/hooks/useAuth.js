// useAuth.js의 역할
// 현재 로그인 여부를 확인하는 커스텀 훅. 실제 서버 인증이 아니라
// localStorage에 저장된 값을 읽어 로그인 상태를 흉내내는 데모용 로직

export function useAuth() {
    // localStorage는 문자열만 저장하므로, 'true' 문자열과 비교해 boolean으로 변환
    // 저장된 값이 없으면 getItem이 null을 반환 -> null === 'true' -> false
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // 이 훅을 쓰는 컴포넌트가 const { isLoggedIn } = useAuth() 형태로 꺼내 쓸 수 있게 객체로 반환
    return { isLoggedIn };
}