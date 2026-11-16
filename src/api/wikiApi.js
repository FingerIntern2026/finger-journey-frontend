// 역할: 백엔드의 핑거위키 API(목록·검색·상세)를 호출. 백엔드 요청만 담당하고 응답의 data만 돌려준다.
// 사용처: useWikiSearch.js
// 담당자: 김재웅

import { sendPost } from "../utils/apiRequestUtils";

const WIKI_LIST_API = "/wiki/list";
const WIKI_SEARCH_API = "/wiki/search";
const WIKI_ITEM_API = "/wiki/item";

// 카테고리 목록 + 각 카테고리의 항목(제목·아이콘)
export async function fetchWikiList() {
  const res = await sendPost(WIKI_LIST_API, {});
  return res.data;
}

// 제목·본문에 검색어가 들어간 항목 목록(itemId, title, categoryName, snippet)
export async function searchWiki(keyword) {
  const res = await sendPost(WIKI_SEARCH_API, { keyword });
  return res.data;
}

// 항목 하나의 본문(content)과 이미지 주소 배열(mediaUrl)
export async function fetchWikiItem(itemId) {
  const res = await sendPost(WIKI_ITEM_API, { itemId });
  return res.data;
}
