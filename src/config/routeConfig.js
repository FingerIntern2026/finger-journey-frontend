// 역할: 데모 전체에서 쓰는 라우트 경로를 한 곳에 상수로 모아둠. AppRoutes.jsx의 <Route path>와
//       각 페이지의 goTo()/navigate() 호출이 전부 이 상수를 참조해야 함 — 경로 문자열을 여러
//       파일에 직접 써두면 나중에 경로 하나 바꿀 때 빠뜨리는 곳이 생기기 쉬움
// 사용처: AppRoutes.jsx, ProtectedRoute.jsx, useNavigation.js, DemoIndexPage.jsx,
//         ReportExamplePage.jsx, ReportResultPage.jsx, GoBackExamplePage.jsx, MoveGuidePage.jsx,
//         ParamPassPage.jsx
// 담당자:

export const ROUTE_PATHS = {
  DEMO_HOME: '/demo',

  // 버튼① 화면이동 하위 흐름
  DEMO_MOVE: '/demo/move',
  DEMO_MOVE_AUTH_CHECK: '/demo/move/auth-check',
  DEMO_MOVE_PARAM: '/demo/move/param',
  DEMO_PARAM_DETAIL: '/demo/param-detail',
  DEMO_MOVE_GO_BACK: '/demo/move/go-back',

  // 버튼② 컴포넌트리스트
  DEMO_COMPONENTS: '/demo/components',

  // 버튼③ 다이얼로그예제
  DEMO_DIALOG: '/demo/dialog',

  // 버튼④ API통신
  DEMO_API: '/demo/api',

  // AI 완주 리포트 데모
  DEMO_REPORT: '/demo/report',
  DEMO_REPORT_RESULT: '/demo/report/result',
};
