// 역할: 기존 화면의 useNavigation 사용부를 Zustand 네비게이션으로 연결하는 임시 호환 훅이다.
// 사용처: 기존 데모 페이지(각 페이지가 새 훅과 스토어로 전환되면 삭제)
// 담당자: 지연, 재웅

import useNavigationStore from '../stores/useNavigationStore';
import useScreenNavigation from './useScreenNavigation';

export default function useNavigation() {
  const { goToScreen } = useScreenNavigation();
  const goBack = useNavigationStore((state) => state.goBack);
  return { goToScreen, goBack, goBackN: goBack };
}
