// 역할: 로그인 안 된 사용자가 보호된 페이지에 접근하면 지정된 화면으로 이동시키는 화면 가드.
// 사용처: AppRoutes.jsx
// 담당자:

import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { SCREEN_CODES } from '../config/screenCodes';
import useNavigationStore from '../stores/useNavigationStore';

// children: 이 컴포넌트로 감싼 실제 보호 대상 페이지 (예: <AuthCheckPage />)
export default function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();
    const goForward = useNavigationStore((state) => state.goForward);

    // 렌더링 중 상태 변경을 피하기 위해 effect에서 이동 처리한다.
    useEffect(() => {
        if (!isLoggedIn) {
            goForward(SCREEN_CODES.DEMO_MOVE, {
                blockedReason: '로그인이 필요한 페이지입니다.',
            });
        }
    }, [goForward, isLoggedIn]);

    // 로그인 안 됐으면 children을 그리지 않고 로그인 토글이 있는 MoveGuidePage로 돌려보냄
    // replace: 브라우저 히스토리에 남기지 않음 (뒤로가기 눌러도 보호된 페이지로 안 돌아감)
    // state로 "왜 튕겼는지" 이유를 같이 넘겨서, MoveGuidePage에서 안내 메시지를 보여줄 수 있게 함
    if (!isLoggedIn) {
        return null;
    }

    // 로그인 됐으면 원래 보여주려던 페이지(children)를 그대로 렌더링
    return children;
}
