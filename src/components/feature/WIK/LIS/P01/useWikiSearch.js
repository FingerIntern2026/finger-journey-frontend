// 역할: 위키 목록·검색·상세를 백엔드 API로 불러와 화면(WikiList)에 필요한 형태로 정리한다.
//       - 목록: 화면이 열릴 때 /wiki/list 한 번
//       - 검색: 검색 버튼을 누르면 /wiki/search, 결과의 itemId로 목록을 걸러 같은 카테고리 구조로 보여줌
//       - 상세: 항목을 처음 펼칠 때 /wiki/item, 한 번 받은 내용은 다시 요청하지 않음
// 사용처: WikiList.jsx
// 담당자: 김재웅

import { useEffect, useMemo, useRef, useState } from "react";
import { fetchWikiItem, fetchWikiList, searchWiki } from "../../../../../api/wikiApi";
import { API_BASE_URL } from "../../../../../config/apiConfig";
import { parseApiError } from "../../../../../utils/apiErrorUtils";

// 서버 응답(categoryId, categoryName ...)을 화면에서 쓰는 이름(id, name ...)으로 바꾼다.
const toCategory = (category) => ({
  id: category.categoryId,
  name: category.categoryName,
  icon: category.icon,
  items: category.items.map((item) => ({
    id: item.itemId,
    title: item.title,
    icon: item.icon,
  })),
});

// 업로드 이미지는 백엔드가 "/media/..." 상대 주소로 내려주므로 서버 주소를 붙여준다.
const toMediaSrc = (url) => (/^https?:\/\//.test(url) ? url : `${API_BASE_URL}${url}`);

export default function useWikiSearch() {
  const [keyword, setKeyword] = useState(""); // 입력창에 지금 타이핑중인 값
  const [searchedKeyword, setSearchedKeyword] = useState(""); // 실제로 검색 버튼을 눌러서 확정된 값
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [wikiList, setWikiList] = useState([]); // 서버에서 받은 원본 목록
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchHits, setSearchHits] = useState(null); // 검색 중이면 { itemId: snippet }
  const [details, setDetails] = useState({}); // { itemId: { status, content, mediaUrls } }

  // 검색을 연달아 눌렀을 때 늦게 도착한 옛 응답이 최신 결과를 덮어쓰지 않게 요청 번호를 기록한다.
  const searchSeq = useRef(0);

  useEffect(() => {
    let cancelled = false;

    fetchWikiList()
      .then((data) => {
        if (!cancelled) setWikiList(data.map(toCategory));
      })
      .catch((err) => {
        if (!cancelled) setErrorMessage(parseApiError(err).message);
      })
      .finally(() => {
        if (!cancelled) setIsLoaded(true);
      });


    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const withDetail = (item) => {
      const detail = details[item.id];
      return {
        ...item,
        // 상세를 받기 전에는 검색 결과의 snippet을 임시 본문으로 보여준다.
        content: detail?.content ?? searchHits?.[item.id] ?? "",
        mediaUrls: detail?.mediaUrls ?? [],
        detailStatus: detail?.status ?? "idle",
      };
    };

    return wikiList
      .map((category) => ({
        ...category,
        items: category.items
          .filter((item) => !searchHits || item.id in searchHits)
          .map(withDetail),
      }))
      .filter((category) => !searchHits || category.items.length > 0);
  }, [wikiList, searchHits, details]);

  const clearSearch = () => {
    searchSeq.current += 1;
    setSearchedKeyword("");
    setSearchHits(null);
    setSelectedItemId(null);
  };

  const handleKeywordChange = (value) => {
    setKeyword(value);
    if (!value.trim()) clearSearch();
  };

  const handleSearch = async (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      clearSearch();
      return;
    }

    const seq = ++searchSeq.current;
    setErrorMessage("");

    try {
      const results = await searchWiki(trimmed);
      if (seq !== searchSeq.current) return;

      setSearchHits(Object.fromEntries(results.map((r) => [r.itemId, r.snippet])));
      setSearchedKeyword(trimmed);
      setSelectedItemId(null);
    } catch (err) {
      if (seq === searchSeq.current) setErrorMessage(parseApiError(err).message);
    }
  };

  const handleToggleCategory = (categoryId) => {
    setOpenCategoryId((currentId) => (currentId === categoryId ? null : categoryId));
    setSelectedItemId(null);
  };

  const loadDetail = async (itemId) => {
    setDetails((prev) => ({ ...prev, [itemId]: { status: "loading" } }));

    try {
      const data = await fetchWikiItem(itemId);
      setDetails((prev) => ({
        ...prev,
        [itemId]: {
          status: "done",
          content: data.content,
          mediaUrls: (data.mediaUrl ?? []).map(toMediaSrc),
        },
      }));
    } catch (err) {
      setDetails((prev) => ({
        ...prev,
        [itemId]: { status: "error", message: parseApiError(err).message },
      }));
    }
  };

  const handleSelectItem = (itemId) => {
    const isClosing = selectedItemId === itemId;
    setSelectedItemId(isClosing ? null : itemId);

    // 처음 펼치거나 이전에 실패했을 때만 상세를 요청한다.
    const status = details[itemId]?.status;
    if (!isClosing && status !== "done" && status !== "loading") loadDetail(itemId);
  };

  return {
    categories,
    keyword,
    searchedKeyword,
    openCategoryId,
    selectedItemId,
    isLoaded,
    errorMessage,
    handleKeywordChange,
    handleSearch,
    handleToggleCategory,
    handleSelectItem,
  };
}
