// DB 화면 목록의 routePath와 filePath를 기준으로 라우트와 화면 컴포넌트를 연결한다.

import { Navigate, Route, Routes } from 'react-router-dom';
import { SCREEN_CODES } from '../config/screenCodes';
import RouteErrorPage from './RouteErrorPage';
import ScreenErrorBoundary from './ScreenErrorBoundary';
import ScreenRenderer from './ScreenRenderer';

export default function AppRoutes({ screens }) {
  const homeScreen = screens.find((screen) => screen.screenCode === SCREEN_CODES.DEMO_HOME);

  if (!homeScreen) {
    throw new Error(`메인 화면정보를 찾을 수 없습니다: ${SCREEN_CODES.DEMO_HOME}`);
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={homeScreen.routePath} replace />} />
      {screens.map((screen) => (
        <Route
          key={screen.screenCode}
          path={screen.routePath}
          element={
            <ScreenErrorBoundary homePath={homeScreen.routePath}>
              <ScreenRenderer screens={screens} path={screen.routePath} />
            </ScreenErrorBoundary>
          }
        />
      ))}
      <Route
        path="*"
        element={
          <RouteErrorPage
            title="페이지를 찾을 수 없습니다."
            message="요청한 주소에 해당하는 화면정보가 없습니다."
            homePath={homeScreen.routePath}
          />
        }
      />
    </Routes>
  );
}
