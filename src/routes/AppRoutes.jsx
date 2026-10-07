// 역할: Zustand의 현재 path를 DB 화면정보 및 filePath 기반 화면 렌더러에 연결한다.
// 사용처: App.jsx
// 담당자: 지연

import { SCREEN_CODES } from '../config/screenCodes';
import useNavigationStore from '../stores/useNavigationStore';
import RouteErrorPage from './RouteErrorPage';
import ScreenErrorBoundary from './ScreenErrorBoundary';
import ScreenRenderer from './ScreenRenderer';

export default function AppRoutes({ screens }) {
  const currentPath = useNavigationStore((state) => state.nowPageParams.path);
  const homeScreen = screens.find((screen) => screen.screenCode === SCREEN_CODES.DEMO_HOME);

  if (!homeScreen) {
    throw new Error(`메인 화면정보를 찾을 수 없습니다: ${SCREEN_CODES.DEMO_HOME}`);
  }

  if (!screens.some((screen) => screen.routePath === currentPath)) {
    return <RouteErrorPage title="페이지를 찾을 수 없습니다." message="현재 경로에 해당하는 화면정보가 없습니다." homePath={homeScreen.routePath} />;
  }

  return (
    <ScreenErrorBoundary key={currentPath} homePath={homeScreen.routePath}>
      <ScreenRenderer screens={screens} path={currentPath} />
    </ScreenErrorBoundary>
  );
}
