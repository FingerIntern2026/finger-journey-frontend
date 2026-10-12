// 역할: 위키 카테고리 검색·아코디언·하위 항목 탐색을 제공한다.
// 사용처: WIK_LIS_P01
// 담당자: 김재웅

import { ChevronDown, ChevronUp } from "lucide-react";
import BaseCard from "../../../../common/base/BaseCard";
import { highlightText } from "../../../../common/custom/CustomSearchbar";
import styles from "./WikiExplorer.module.css";

export default function WikiExplorer({
  categories,
  keyword,
  openCategoryId,
  selectedItemId,
  onToggleCategory,
  onSelectItem,
}) {
  const isSearching = Boolean(keyword.trim());

  return (
    <section className={styles.list} aria-label="핑거 위키 목록">
      {categories.map((category) => {
        const isOpen = isSearching || openCategoryId === category.id;

        return (
          <BaseCard key={category.id} className={styles.categoryCard}>
            <button
              type="button"
              className={styles.categoryToggle}
              onClick={() => onToggleCategory(category.id)}
              aria-expanded={isOpen}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryText}>
                <strong>{highlightText(category.name, keyword)}</strong>
                <small>{category.items.length}개 항목</small>
              </span>
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
              <div className={styles.itemArea}>
                {category.items.map((item) => {
                  const isSelected = selectedItemId === item.id;

                  return (
                    <article key={item.id} className={styles.item}>
                      <button
                        type="button"
                        className={styles.itemToggle}
                        onClick={() => onSelectItem(item.id)}
                        aria-expanded={isSelected}
                      >
                        <span className={styles.itemTitle}>
                          <span aria-hidden="true">{item.icon}</span>
                          {highlightText(item.title, keyword)}
                        </span>
                        <ChevronDown
                          size={14}
                          className={isSelected ? styles.itemChevronOpen : ""}
                          aria-hidden="true"
                        />
                      </button>

                      {isSelected && (
                        <div className={styles.detail}>
                          <p>{highlightText(item.content, keyword)}</p>
                          {item.attachment && (
                            <div className={styles.attachment}>
                              <span>첨부 이미지</span>
                              <strong>{item.attachment}</strong>
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </BaseCard>
        );
      })}
    </section>
  );
}
