// 백엔드 화면정보 테이블을 앱 시작 시 한 번 조회하고 화면 코드와 URL 연결을 캐싱한다.

import { sendPost } from '../api/client';
import { traced } from '../devtrace/traced';
import { parseApiError } from './apiError';

const SCREEN_LIST_API = '/admin/screen/list';
const BACK_ACTIONS = new Set(['TARGET', 'EXIT', 'BLOCK']);

let cachedScreens = null;

function validateScreens(screens) {
  const codes = new Set();
  const paths = new Set();

  for (const screen of screens) {
    if (!screen.screenCode || !screen.routePath) {
      throw new Error('화면정보에 screenCode와 routePath가 필요합니다.');
    }
    if (!BACK_ACTIONS.has(screen.backAction)) {
      throw new Error(`지원하지 않는 뒤로가기 동작입니다: ${screen.backAction}`);
    }
    if (typeof screen.loginRequired !== 'boolean') {
      throw new Error(`로그인 필요 여부가 올바르지 않습니다: ${screen.screenCode}`);
    }
    if (screen.backAction === 'TARGET' && !screen.backScreenCode) {
      throw new Error(`뒤로가기 대상 화면 코드가 없습니다: ${screen.screenCode}`);
    }
    if (screen.backAction === 'EXIT' && !screen.exitScreenCode) {
      throw new Error(`업무 종료 화면 코드가 없습니다: ${screen.screenCode}`);
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

function normalizeScreens(screens) {
  return screens.map((screen) => ({
    ...screen,
    // 이전 버전 API와도 호환되도록 필드가 없으면 공개 화면으로 취급한다.
    loginRequired: screen.loginRequired ?? false,
  }));
}

async function _fetchScreenList() {
  if (cachedScreens) {
    return cachedScreens;
  }

  try {
    const response = await sendPost(SCREEN_LIST_API, {});

    if (!response.success || !Array.isArray(response.data)) {
      throw new Error('화면정보 응답 형식이 올바르지 않습니다.');
    }

    cachedScreens = validateScreens(normalizeScreens(response.data));
    return cachedScreens;
  } catch (error) {
    const { message } = parseApiError(error);
    throw new Error(`화면정보를 불러오지 못했습니다: ${message}`);
  }
}

function _getScreenList() {
  if (!cachedScreens) {
    throw new Error('화면정보가 아직 초기화되지 않았습니다.');
  }
  return cachedScreens;
}

function _findScreenByCode(screenCode) {
  return _getScreenList().find((screen) => screen.screenCode === screenCode) ?? null;
}

function _findScreenByPath(routePath) {
  return _getScreenList().find((screen) => screen.routePath === routePath) ?? null;
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
export const findScreenByPath = traced('findScreenByPath', 'src/utils/screenConfig.js', _findScreenByPath);
export const getRoutePath = traced('getRoutePath', 'src/utils/screenConfig.js', _getRoutePath);
