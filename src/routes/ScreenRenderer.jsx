// 역할: 현재 path와 DB routePath가 일치하는 화면을 찾아 filePath 기준으로 동적 렌더링한다.
// 사용처: AppRoutes.jsx, 추후 navigationStore의 nowPageParams.path 기반 최상위 화면 렌더러
// 담당자: 홍지연

import { createElement, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { loadScreenComponent } from './screenLoader';

export default function ScreenRenderer({ screens, path }) {
  const screen = screens.find((item) => item.routePath === path);

  if (!screen) {
    throw new Error(`현재 path에 해당하는 화면정보가 없습니다: ${path}`);
  }

  const Component = loadScreenComponent(screen.filePath);
  const element = (
    <Suspense fallback={<main role="status" style={{ padding: 24 }}>화면을 불러오는 중입니다.</main>}>
      {createElement(Component)}
    </Suspense>
  );

  return screen.loginRequired ? <ProtectedRoute>{element}</ProtectedRoute> : element;
}
