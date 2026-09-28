// 화면 목록의 routePath와 프론트 컴포넌트 레지스트리를 조합해 라우트를 등록한다.

import { Navigate, Route, Routes } from 'react-router-dom';
import { SCREEN_COMPONENTS } from '../config/screenComponents';
import { SCREEN_CODES } from '../config/screenCodes';
import ProtectedRoute from './ProtectedRoute';

function renderScreen(screen) {
  const Component = SCREEN_COMPONENTS[screen.screenCode];

  if (!Component) {
    throw new Error(`컴포넌트가 등록되지 않은 화면 코드입니다: ${screen.screenCode}`);
  }

  // loginRequired는 화면정보 테이블(screen_info.login_required)에서 내려오는 값.
  // 개별 페이지는 이 값을 신경 쓸 필요 없이 여기서 ProtectedRoute로 감싸는 걸로 통일한다.
  const element = <Component />;
  return screen.loginRequired ? <ProtectedRoute>{element}</ProtectedRoute> : element;
}

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
          element={renderScreen(screen)}
        />
      ))}
    </Routes>
  );
}
