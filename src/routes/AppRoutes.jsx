// 역할: 데모 전체 URL과 페이지 컴포넌트를 연결하는 라우팅 표. BrowserRouter는 main.jsx에서
//       앱 전체를 감싸고 있고, 여기서는 <Routes>만 정의함
// 사용처: App.jsx
// 담당자:

import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ROUTE_PATHS } from '../config/routeConfig';

import DemoIndexPage from '../pages/demo/DEMO_HOM_P01_DemoIndexPage';
import MoveGuidePage from '../pages/demo/DEMO_MOV_P01_MoveGuidePage';
import AuthCheckPage from '../pages/demo/DEMO_AUT_P01_AuthCheckPage';
import ParamPassPage from '../pages/demo/DEMO_PRM_P01_ParamPassPage';
import ParamDetailPage from '../pages/demo/DEMO_PRM_P02_ParamDetailPage';
import GoBackExamplePage from '../pages/demo/DEMO_MOV_P02_GoBackExamplePage';
import ComponentListPage from '../pages/demo/DEMO_CMP_P01_ComponentListPage';
import DialogExamplePage from '../pages/demo/DEMO_DLG_P01_DialogExamplePage';
import ApiExamplePage from '../pages/demo/DEMO_API_P01_ApiExamplePage';
import ReportExamplePage from '../pages/demo/DEMO_RPT_P01_ReportExamplePage';
import ReportResultPage from '../pages/demo/DEMO_RPT_P02_ReportResultPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 루트로 접속하면 데모 첫 화면으로 보냄 */}
      <Route path="/" element={<Navigate to={ROUTE_PATHS.DEMO_HOME} replace />} />

      {/* 버튼①②③④가 있는 첫 화면 */}
      <Route path={ROUTE_PATHS.DEMO_HOME} element={<DemoIndexPage />} />

      {/* 버튼① 화면이동 하위 흐름 */}
      <Route path={ROUTE_PATHS.DEMO_MOVE} element={<MoveGuidePage />} />
      <Route
        path={ROUTE_PATHS.DEMO_MOVE_AUTH_CHECK}
        element={
          <ProtectedRoute>
            <AuthCheckPage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTE_PATHS.DEMO_MOVE_PARAM} element={<ParamPassPage />} />
      <Route path={ROUTE_PATHS.DEMO_PARAM_DETAIL} element={<ParamDetailPage />} />
      <Route path={ROUTE_PATHS.DEMO_MOVE_GO_BACK} element={<GoBackExamplePage />} />

      {/* 버튼② 컴포넌트리스트 */}
      <Route path={ROUTE_PATHS.DEMO_COMPONENTS} element={<ComponentListPage />} />

      {/* 버튼③ 다이얼로그예제 */}
      <Route path={ROUTE_PATHS.DEMO_DIALOG} element={<DialogExamplePage />} />

      {/* 버튼④ API통신 */}
      <Route path={ROUTE_PATHS.DEMO_API} element={<ApiExamplePage />} />

      {/* 버튼⑤ AI 완주 리포트 */}
      <Route path={ROUTE_PATHS.DEMO_REPORT} element={<ReportExamplePage />} />
      <Route path={ROUTE_PATHS.DEMO_REPORT_RESULT} element={<ReportResultPage />} />
    </Routes>
  );
}
