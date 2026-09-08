// AppRoutes.jsx의 역할
// 데모 전체 URL과 페이지 컴포넌트를 연결하는 라우팅 표
// BrowserRouter는 main.jsx에서 앱 전체를 감싸고 있고, 여기서는 <Routes>만 정의함

import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import DemoIndexPage from '../pages/demo/DemoIndexPage';
import MoveGuidePage from '../pages/demo/MoveGuidePage';
import AuthCheckPage from '../pages/demo/AuthCheckPage';
import ParamPassPage from '../pages/demo/ParamPassPage';
import ParamDetailPage from '../pages/demo/ParamDetailPage';
import GoBackExamplePage from '../pages/demo/GoBackExamplePage';
import ComponentListPage from '../pages/demo/ComponentListPage';
import DialogExamplePage from '../pages/demo/DialogExamplePage';
import ApiExamplePage from '../pages/demo/ApiExamplePage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 루트로 접속하면 데모 첫 화면으로 보냄 */}
      <Route path="/" element={<Navigate to="/demo" replace />} />

      {/* 버튼①②③④가 있는 첫 화면 */}
      <Route path="/demo" element={<DemoIndexPage />} />

      {/* 버튼① 화면이동 하위 흐름 */}
      <Route path="/demo/move" element={<MoveGuidePage />} />
      <Route
        path="/demo/move/auth-check"
        element={
          <ProtectedRoute>
            <AuthCheckPage />
          </ProtectedRoute>
        }
      />
      <Route path="/demo/move/param" element={<ParamPassPage />} />
      <Route path="/demo/param-detail" element={<ParamDetailPage />} />
      <Route path="/demo/move/go-back" element={<GoBackExamplePage />} />

      {/* 버튼② 컴포넌트리스트 */}
      <Route path="/demo/components" element={<ComponentListPage />} />

      {/* 버튼③ 다이얼로그예제 */}
      <Route path="/demo/dialog" element={<DialogExamplePage />} />

      {/* 버튼④ API통신 */}
      <Route path="/demo/api" element={<ApiExamplePage />} />
    </Routes>
  );
}
