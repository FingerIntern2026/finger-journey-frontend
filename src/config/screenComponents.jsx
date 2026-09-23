import ApiExamplePage from '../pages/demo/DEMO_API_P01_ApiExamplePage';
import AuthCheckPage from '../pages/demo/DEMO_AUT_P01_AuthCheckPage';
import ComponentListPage from '../pages/demo/DEMO_CMP_P01_ComponentListPage';
import DialogExamplePage from '../pages/demo/DEMO_DLG_P01_DialogExamplePage';
import DemoIndexPage from '../pages/demo/DEMO_HOM_P01_DemoIndexPage';
import MoveGuidePage from '../pages/demo/DEMO_MOV_P01_MoveGuidePage';
import GoBackExamplePage from '../pages/demo/DEMO_MOV_P02_GoBackExamplePage';
import ParamPassPage from '../pages/demo/DEMO_PRM_P01_ParamPassPage';
import ParamDetailPage from '../pages/demo/DEMO_PRM_P02_ParamDetailPage';
import ReportExamplePage from '../pages/demo/DEMO_RPT_P01_ReportExamplePage';
import ReportResultPage from '../pages/demo/DEMO_RPT_P02_ReportResultPage';
import { SCREEN_CODES } from './screenCodes';

// API는 React 컴포넌트를 전달할 수 없으므로 화면 코드와 컴포넌트의 연결은 프론트에서 관리한다.
export const SCREEN_COMPONENTS = Object.freeze({
  [SCREEN_CODES.DEMO_HOME]: DemoIndexPage,
  [SCREEN_CODES.DEMO_MOVE]: MoveGuidePage,
  [SCREEN_CODES.DEMO_AUTH_CHECK]: AuthCheckPage,
  [SCREEN_CODES.DEMO_PARAM_PASS]: ParamPassPage,
  [SCREEN_CODES.DEMO_PARAM_DETAIL]: ParamDetailPage,
  [SCREEN_CODES.DEMO_GO_BACK]: GoBackExamplePage,
  [SCREEN_CODES.DEMO_COMPONENTS]: ComponentListPage,
  [SCREEN_CODES.DEMO_DIALOG]: DialogExamplePage,
  [SCREEN_CODES.DEMO_API]: ApiExamplePage,
  [SCREEN_CODES.DEMO_REPORT]: ReportExamplePage,
  [SCREEN_CODES.DEMO_REPORT_RESULT]: ReportResultPage,
});
