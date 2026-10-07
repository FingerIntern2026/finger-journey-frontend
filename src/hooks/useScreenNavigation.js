// 역할: 화면 코드로 DB 화면정보를 찾고 Zustand의 goForward 액션으로 화면 이동을 요청한다.
// 사용처: 화면 컴포넌트, useNavigation.js 호환 어댑터
// 담당자: 지연

import useNavigationStore from '../stores/useNavigationStore';
import { findScreenByCode } from '../utils/screenConfig';

export default function useScreenNavigation() {
  const goForward = useNavigationStore((state) => state.goForward);

  const goToScreen = (screenCode, params) => {
    const targetScreen = findScreenByCode(screenCode);
    if (!targetScreen) throw new Error(`등록되지 않은 화면 코드입니다: ${screenCode}`);
    return goForward({ path: targetScreen.routePath, params });
  };

  return { goToScreen };
}
