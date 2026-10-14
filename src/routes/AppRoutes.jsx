// 역할: Zustand의 현재 path를 DB 화면정보 및 filePath 기반 화면 렌더러에 연결한다.
// 사용처: App.jsx
// 담당자: 김재웅

import useNavigationStore from '../stores/useNavigationStore';
import ScreenRenderer from './ScreenRenderer';

export default function AppRoutes({ screens }) {
  const currentPath = useNavigationStore(
      (state) => state.nowPageParams.path);


  return <ScreenRenderer screens={screens} path={currentPath} />;
}
