import { useMemo, useState } from "react";
import { WIKI_CATEGORIES } from "./wikiCategories";

export default function useWikiSearch() {
  const [keyword, setKeyword] = useState("");
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const categories = useMemo(() => {
    const normalizedKeyword = searchedKeyword.trim().toLowerCase();

    if (!normalizedKeyword) return WIKI_CATEGORIES;

    return WIKI_CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter((item) => (
        `${item.title} ${item.content}`.toLowerCase().includes(normalizedKeyword)
      )),
    })).filter((category) => category.items.length > 0);
  }, [searchedKeyword]);

  const handleKeywordChange = (value) => {
    setKeyword(value);

    if (!value.trim()) {
      setSearchedKeyword("");
      setSelectedItemId(null);
    }
  };

  const handleSearch = (value) => {
    setSearchedKeyword(value);
    setSelectedItemId(null);
  };

  const handleToggleCategory = (categoryId) => {
    setOpenCategoryId((currentId) => (currentId === categoryId ? null : categoryId));
    setSelectedItemId(null);
  };

  const handleSelectItem = (itemId) => {
    setSelectedItemId((currentId) => (currentId === itemId ? null : itemId));
  };

  return {
    categories,
    keyword,
    searchedKeyword,
    openCategoryId,
    selectedItemId,
    handleKeywordChange,
    handleSearch,
    handleToggleCategory,
    handleSelectItem,
  };
}
