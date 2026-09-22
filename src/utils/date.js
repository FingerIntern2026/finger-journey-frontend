// date.js의 역할
// 화면에 날짜를 보여줄 때 형식을 통일하기 위한 순수 함수 모음
// 지금은 쓰는 곳이 없지만, 관리자 화면(입사일 표시 등)에서 곧 여러 군데 필요해질 예정이라
// 그때마다 각자 다르게 포맷하지 않도록 미리 만들어둠

import { traced } from '../devtrace/traced';

// "2026-09-21" 같은 ISO 날짜 문자열을 "2026년 9월 21일" 형태로 바꿔줌
// 값이 없거나 형식이 이상하면 빈 문자열을 돌려줌 (화면에 "Invalid Date" 같은 게 그대로 노출되지 않게)
function _formatDate(isoString) {
    if (!isoString) return '';

    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '';

    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

// 입사일 등에서 "오늘 기준 며칠째"를 구할 때 쓰는 함수
// 예: formatDate로 보여주는 날짜 옆에 "(D+12)" 같은 문구를 같이 보여주고 싶을 때 사용
function _daysSince(isoString) {
    if (!isoString) return null;

    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return null;

    const diffMs = Date.now() - date.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export const formatDate = traced('formatDate', 'src/utils/date.js', _formatDate);
export const daysSince = traced('daysSince', 'src/utils/date.js', _daysSince);
