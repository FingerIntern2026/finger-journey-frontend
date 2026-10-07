// 역할: 백엔드에서 받은 화면정보를 검증하고 캐싱한 뒤, 화면 코드나 경로로 조회

import { fetchScreens } from "../api/screenApi";
import { hasScreenModule } from "../routes/screenLoader";
import { parseApiError } from "../utils/apiError";

const BACK_ACTIONS = new Set([
  "TARGET",
  "EXIT",
  "BLOCK",
]);

let cachedScreens = null;

/**
 * 백엔드에서 받은 화면정보의 생략 가능한 값을
 * 프론트에서 사용할 기본값으로 채운다.
 */
function normalizeScreens(screens) {
  return screens.map((screen) => ({
    ...screen,
    loginRequired: screen.loginRequired ?? false,
  }));
}

/**
 * 화면정보가 프론트에서 사용할 수 있는 형태인지 검사한다.
 */
function validateScreens(screens) {
  const codes = new Set();
  const paths = new Set();

  for (const screen of screens) {
    if (
      !screen.screenCode ||
      !screen.routePath ||
      !screen.filePath
    ) {
      throw new Error(
        "화면정보에 screenCode, routePath, filePath가 필요합니다."
      );
    }

    if (!BACK_ACTIONS.has(screen.backAction)) {
      throw new Error(
        `지원하지 않는 뒤로가기 동작입니다: ${screen.backAction}`
      );
    }

    if (typeof screen.loginRequired !== "boolean") {
      throw new Error(
        `로그인 필요 여부가 올바르지 않습니다: ${screen.screenCode}`
      );
    }

    if (
      screen.backAction === "TARGET" &&
      !screen.backScreenCode
    ) {
      throw new Error(
        `뒤로가기 대상 화면 코드가 없습니다: ${screen.screenCode}`
      );
    }

    if (
      screen.backAction === "EXIT" &&
      !screen.exitScreenCode
    ) {
      throw new Error(
        `업무 종료 화면 코드가 없습니다: ${screen.screenCode}`
      );
    }

    if (codes.has(screen.screenCode)) {
      throw new Error(
        `중복된 화면 코드입니다: ${screen.screenCode}`
      );
    }

    if (paths.has(screen.routePath)) {
      throw new Error(
        `중복된 화면 경로입니다: ${screen.routePath}`
      );
    }

    if (!hasScreenModule(screen.filePath)) {
      throw new Error(
        `화면 파일을 찾을 수 없습니다: ${screen.filePath}`
      );
    }

    codes.add(screen.screenCode);
    paths.add(screen.routePath);
  }

  return screens;
}

/**
 * 앱에서 사용할 화면 목록을 준비한다.
 *
 * 첫 호출에서는 백엔드에 요청하고,
 * 이후 호출에서는 캐싱된 화면 목록을 반환한다.
 */
async function fetchScreenList() {
  if (cachedScreens) {
    return cachedScreens;
  }

  try {
    const response = await fetchScreens();

    if (
      !response.success ||
      !Array.isArray(response.data)
    ) {
      throw new Error(
        "화면정보 응답 형식이 올바르지 않습니다."
      );
    }

    const normalizedScreens = normalizeScreens(
      response.data
    );

    cachedScreens = validateScreens(
      normalizedScreens
    );

    return cachedScreens;
  } catch (error) {
    const { message } = parseApiError(error);

    throw new Error(
      `화면정보를 불러오지 못했습니다: ${message}`
    );
  }
}

/**
 * 캐싱된 전체 화면 목록을 반환한다.
 */
function getScreenList() {
  if (!cachedScreens) {
    throw new Error(
      "화면정보가 아직 초기화되지 않았습니다."
    );
  }

  return cachedScreens;
}

/**
 * 화면 코드로 화면정보를 찾는다.
 */
function findScreenByCode(screenCode) {
  return (
    getScreenList().find(
      (screen) => screen.screenCode === screenCode
    ) ?? null
  );
}

/**
 * URL 경로로 화면정보를 찾는다.
 */
function findScreenByPath(routePath) {
  return (
    getScreenList().find(
      (screen) => screen.routePath === routePath
    ) ?? null
  );
}

/**
 * 화면 코드에 해당하는 URL 경로를 반환한다.
 */
function getRoutePath(screenCode) {
  const screen = findScreenByCode(screenCode);

  if (!screen) {
    throw new Error(
      `등록되지 않은 화면 코드입니다: ${screenCode}`
    );
  }

  return screen.routePath;
}

/**
 * 저장된 화면 목록을 초기화한다.
 *
 * 초기화 후 fetchScreenList를 호출하면
 * 백엔드 API를 다시 호출한다.
 */
function clearScreenCache() {
  cachedScreens = null;
}

export {
  fetchScreenList,
  getScreenList,
  findScreenByCode,
  findScreenByPath,
  getRoutePath,
  clearScreenCache,
};