// 화면 코드와 URL의 연결을 관리한다.
// 백엔드 화면 목록 API가 제공되기 전까지는 동일한 응답 형태의 로컬 목록을 사용한다.
// 이후 fetchScreenList()의 데이터 공급부만 API 호출로 교체하면 소비 코드는 유지할 수 있다.

import { SCREEN_CODES } from '../config/screenCodes';
import { traced } from '../devtrace/traced';

const LOCAL_SCREENS = Object.freeze([
  { screenCode: SCREEN_CODES.DEMO_HOME, screenName: '데모 메인', routePath: '/demo', loginRequired: false },
  { screenCode: SCREEN_CODES.DEMO_MOVE, screenName: '화면 이동', routePath: '/demo/move', loginRequired: false },
  { screenCode: SCREEN_CODES.DEMO_AUTH_CHECK, screenName: '권한 검사', routePath: '/demo/move/auth-check', loginRequired: true },
  { screenCode: SCREEN_CODES.DEMO_PARAM_PASS, screenName: '파라미터 전달', routePath: '/demo/move/param', loginRequired: false },
  { screenCode: SCREEN_CODES.DEMO_PARAM_DETAIL, screenName: '파라미터 상세', routePath: '/demo/param-detail', loginRequired: false },
  { screenCode: SCREEN_CODES.DEMO_GO_BACK, screenName: '뒤로가기', routePath: '/demo/move/go-back', loginRequired: false },
  { screenCode: SCREEN_CODES.DEMO_COMPONENTS, screenName: '컴포넌트 목록', routePath: '/demo/components', loginRequired: false },
  { screenCode: SCREEN_CODES.DEMO_DIALOG, screenName: '다이얼로그', routePath: '/demo/dialog', loginRequired: false },
  { screenCode: SCREEN_CODES.DEMO_API, screenName: 'API 통신', routePath: '/demo/api', loginRequired: false },
  { screenCode: SCREEN_CODES.DEMO_REPORT, screenName: '완주 리포트', routePath: '/demo/report', loginRequired: false },
  { screenCode: SCREEN_CODES.DEMO_REPORT_RESULT, screenName: '완주 리포트 결과', routePath: '/demo/report/result', loginRequired: false },
]);

let cachedScreens = null;

function validateScreens(screens) {
  const codes = new Set();
  const paths = new Set();

  for (const screen of screens) {
    if (!screen.screenCode || !screen.routePath) {
      throw new Error('화면정보에 screenCode와 routePath가 필요합니다.');
    }
    if (codes.has(screen.screenCode)) {
      throw new Error(`중복된 화면 코드입니다: ${screen.screenCode}`);
    }
    if (paths.has(screen.routePath)) {
      throw new Error(`중복된 화면 경로입니다: ${screen.routePath}`);
    }
    codes.add(screen.screenCode);
    paths.add(screen.routePath);
  }

  return screens;
}

async function _fetchScreenList() {
  if (!cachedScreens) {
    cachedScreens = validateScreens([...LOCAL_SCREENS]);
  }
  return cachedScreens;
}

function _getScreenList() {
  return cachedScreens ?? validateScreens([...LOCAL_SCREENS]);
}

function _findScreenByCode(screenCode) {
  return _getScreenList().find((screen) => screen.screenCode === screenCode) ?? null;
}

function _getRoutePath(screenCode) {
  const screen = _findScreenByCode(screenCode);
  if (!screen) {
    throw new Error(`등록되지 않은 화면 코드입니다: ${screenCode}`);
  }
  return screen.routePath;
}

export function clearScreenCache() {
  cachedScreens = null;
}

export const fetchScreenList = traced('fetchScreenList', 'src/utils/screenConfig.js', _fetchScreenList);
export const getScreenList = traced('getScreenList', 'src/utils/screenConfig.js', _getScreenList);
export const findScreenByCode = traced('findScreenByCode', 'src/utils/screenConfig.js', _findScreenByCode);
export const getRoutePath = traced('getRoutePath', 'src/utils/screenConfig.js', _getRoutePath);
