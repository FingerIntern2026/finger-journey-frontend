import { BookOpen, Sprout } from "lucide-react";
import BaseButton from "../../../../common/base/BaseButton";
import CustomSearchbar from "../../../../common/custom/CustomSearchbar";
import WikiExplorer from "./WikiExplorer";
import useWikiSearch from "./useWikiSearch";
import styles from "./WikiList.module.css";

export default function WikiList({ onCreateReport }) {
  const {
    categories,
    keyword,
    searchedKeyword,
    openCategoryId,
    selectedItemId,
    handleKeywordChange,
    handleSearch,
    handleToggleCategory,
    handleSelectItem,
  } = useWikiSearch();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}><BookOpen size={22} aria-hidden="true" /></span>
          <strong>핑거 위키</strong>
        </div>
        <div className={styles.reportBrand}>
          <Sprout size={24} aria-hidden="true" />
          <span>AI 리포트</span>
        </div>
      </header>

      <p className={styles.guide}>핑거 생활에 필요한 모든 이야기를 핑거위키에 담아두었어요.</p>

      <CustomSearchbar
        value={keyword}
        onChange={handleKeywordChange}
        onSearch={handleSearch}
        placeholder="회의실, 맛집, 주차 등을 검색해보세요"
        className={styles.search}
      />

      <WikiExplorer
        categories={categories}
        keyword={searchedKeyword}
        openCategoryId={openCategoryId}
        selectedItemId={selectedItemId}
        onToggleCategory={handleToggleCategory}
        onSelectItem={handleSelectItem}
      />

      {categories.length === 0 && (
        <p className={styles.emptyMessage}>검색 결과가 없어요. 다른 검색어로 찾아보세요.</p>
      )}

      <BaseButton
        label={<>퀴즈풀고<br />AI 리포트 생성하러 가기!</>}
        fullWidth
        className={styles.reportButton}
        onClick={onCreateReport}
      />
    </main>
  );
}
