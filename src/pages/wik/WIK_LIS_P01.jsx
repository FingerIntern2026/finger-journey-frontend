import { useMemo, useState } from "react";
import CustomSearchbar from "../../components/common/custom/CustomSearchbar";
import WikiExplorer from "../../components/feature/WIK/LIS/P01/WikiExplorer";
import styles from "./WIK_LIS_P01.module.css";

const CATEGORIES = [
  { id: "company", icon: "🏠", name: "회사생활 꿀팁", items: ["회의실 예약하는 법", "복합기 사용법", "택배 받는 법", "사내 와이파이 연결", "연차·반차 신청 방법", "회식비 정산 방법"] },
  { id: "tips", icon: "🎁", name: "선배들의 꿀팁", items: ["업무일지는 그냥 바로 쓰는 게 편해요", "포레스트는 꼭 해볼래요"] },
  { id: "map", icon: "🗺️", name: "회사 지도", items: ["회의실 위치", "휴게 공간 안내"] },
  { id: "food", icon: "🍜", name: "회사 주변 맛집", items: ["점심 맛집 추천"] },
  { id: "forest", icon: "🌲", name: "포레스트 & 레벨업", items: ["포레스트(Forest)가 뭔가요?", "포레스트를 레벨업한 무슨 관계예요?"] },
];

export default function WIK_LIS_P01({ preview = false }) {
  const [keyword, setKeyword] = useState("");
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const searchedCategories = useMemo(() => {
    if (!searchedKeyword.trim()) return CATEGORIES;
    const normalized = searchedKeyword.toLowerCase();
    return CATEGORIES.map((category) => ({ ...category, items: category.items.filter((item) => item.toLowerCase().includes(normalized)) })).filter((category) => category.items.length > 0);
  }, [searchedKeyword]);

  return (
    <main className={`${styles.page} ${preview ? styles.previewPage : ""}`}>
      <header className={styles.header}><strong>📚 핑거 위키</strong><span>🌱 AI 리포트</span></header>
      <p className={styles.guide}>핑거 생활에 필요한 모든 이야기를 핑거위키에 담아두었어요.</p>
      <CustomSearchbar value={keyword} onChange={setKeyword} onSearch={setSearchedKeyword} placeholder="회의실, 맛집, 주차 등을 검색해보세요" className={styles.search} />
      <WikiExplorer categories={searchedCategories} keyword={searchedKeyword} openCategoryId={openCategoryId} selectedItem={selectedItem} onToggle={setOpenCategoryId} onItemClick={setSelectedItem} />
      <button type="button" className={styles.reportButton} onClick={() => {}}>퀴즈풀고<br />AI 리포트 생성하러 가기!</button>
    </main>
  );
}
