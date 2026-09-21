// highlight.js의 역할
// 검색어와 일치하는 부분을 찾아 텍스트를 조각내는 순수 함수
// 원래 CustomSearchbar.jsx 안에 highlightText라는 이름으로 JSX까지 포함해서 들어있었는데,
// 유틸은 React 문법 없는 순수 함수여야 하고, 핑거위키 검색결과(SearchHighlight, 인터페이스
// 명세서 4.4.3)에서도 똑같은 로직이 또 필요해서 여기로 분리함
// -> JSX(<mark>)를 만드는 건 각 컴포넌트 몫으로 남기고, 이 함수는 "조각난 데이터"만 돌려줌

// text를 keyword 기준으로 잘라서 [{ text, matched }, ...] 배열로 돌려줌
// matched가 true인 조각만 컴포넌트에서 강조 처리(<mark> 등)하면 됨
export function getHighlightSegments(text, keyword) {
    if (!keyword) {
        return [{ text: String(text), matched: false }];
    }

    // 정규식 특수문자(.*+? 등)가 검색어에 섞여 들어오면 정규식이 깨지므로 이스케이프 처리
    const escaped = String(keyword).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = String(text).split(regex);
    const keywordLower = String(keyword).toLowerCase();

    // 주의 : regex에 'g' 플래그가 있으면 .test()를 반복 호출할 때 lastIndex가 누적되어
    // 매번 결과가 달라지는 흔한 실수가 생김. 그래서 정규식으로 다시 검사하지 않고,
    // split이 쪼개준 조각이 keyword와 대소문자 무시하고 같은지 문자열로만 비교함
    return parts
        .filter((part) => part !== '')
        .map((part) => ({
            text: part,
            matched: part.toLowerCase() === keywordLower,
        }));
}
