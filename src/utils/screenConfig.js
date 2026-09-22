// 역할: 백엔드 화면정보 테이블(url, 화면아이디, 로그인 필수 여부)을 가져오는 유틸
//       (5·6주차 피드백의 "커스텀 가져오는 유틸", 9/21 회의에서 확정). 앱이 시작될 때 한 번
//       이 목록을 받아와서, AppRoutes.jsx가 화면아이디↔URL을 하드코딩된 <Route> 대신 이
//       데이터로 동적으로 등록하는 데 씀. apiUrl은 파트A가 실제 API를 만들기 전까지 쓰는 더미 경로
// 사용처: 현재 사용하는 곳 없음 (AppRoutes.jsx 동적 등록에 연동 예정)
// 담당자:

import { sendPost } from '../api/client';
import { parseApiError } from './apiError';
import { traced } from '../devtrace/traced';

const SCREEN_LIST_API = '/admin/screen/list';

// 한 번 받아온 목록을 메모리에 캐싱 (앱 켜져 있는 동안은 매번 다시 요청 안 함)
let cachedScreens = null;

// 화면정보 테이블 목록을 가져옴
// 반환 형태 예시 : [{ screenId: 'DEMO_HOME', url: '/demo', loginRequired: false }, ...]
async function _fetchScreenList() {
    if (cachedScreens) {
        return cachedScreens;
    }

    try {
        const data = await sendPost(SCREEN_LIST_API, {});
        cachedScreens = data;
        return cachedScreens;
    } catch (err) {
        const { message } = parseApiError(err);
        throw new Error(`화면정보를 불러오지 못했습니다: ${message}`);
    }
}

// screenId 하나로 화면 정보를 찾을 때 사용 (예: 특정 화면이 로그인 필요한지 확인)
// fetchScreenList()가 먼저 한 번 호출돼서 캐시가 채워져 있어야 함
function _findScreenById(screenId) {
    return cachedScreens?.find((screen) => screen.screenId === screenId) ?? null;
}

// 테스트/개발 중 캐시를 강제로 비우고 싶을 때 사용
export function clearScreenCache() {
    cachedScreens = null;
}

export const fetchScreenList = traced('fetchScreenList', 'src/utils/screenConfig.js', _fetchScreenList);
export const findScreenById = traced('findScreenById', 'src/utils/screenConfig.js', _findScreenById);
