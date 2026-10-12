// 역할: 위키 카테고리와 하위 항목을 아코디언으로 표시하고 관리 동작을 연결한다.
// 사용처: ADM_WIK_P01
// 담당자: 김재웅

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import BaseButton from "../../../../common/base/BaseButton";
import BaseCard from "../../../../common/base/BaseCard";
import styles from "./AdminWikiCategoryList.module.css";

export default function AdminWikiCategoryList({ categories, onAddItem, onEditItem, onDeleteCategory, onDeleteItem }) {
  return (
    <div className={styles.list}>
      {categories.map((category) => (
        <WikiCategoryCard key={category.id} category={category} onAddItem={onAddItem} onEditItem={onEditItem} onDeleteCategory={onDeleteCategory} onDeleteItem={onDeleteItem} />
      ))}
    </div>
  );
}

function WikiCategoryCard({ category, onAddItem, onEditItem, onDeleteCategory, onDeleteItem }) {
  const [open, setOpen] = useState(category.id === "company-life");

  return (
    <BaseCard className={`${styles.categoryCard} ${open ? styles.open : ""}`}>
      <div className={styles.categoryHeader}>
        <button type="button" className={styles.categoryToggle} onClick={() => setOpen((value) => !value)}>
          <span className={styles.categoryIcon}>{category.icon}</span>
          <span className={styles.categoryText}><strong>{category.name}</strong><small>{category.items.length}개 항목</small></span>
        </button>
        <div className={styles.categoryActions}>
          {open && <BaseButton label="삭제" variant="danger" className={styles.deleteButton} onClick={() => onDeleteCategory(category)} />}
          <button type="button" className={styles.chevronButton} aria-label={`${category.name} ${open ? "접기" : "펼치기"}`} onClick={() => setOpen((value) => !value)}>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
        </div>
      </div>
      {open && (
        <div className={styles.itemArea}>
          {category.items.map((item) => (
            <div className={styles.itemRow} key={item.id}>
              <span className={styles.itemTitle}>{item.icon} {item.title}</span>
              <span className={styles.itemActions}>
                <BaseButton label="수정" variant="ghost" className={styles.editButton} onClick={() => onEditItem(category.id, item)} />
                <BaseButton label="삭제" variant="danger" className={styles.deleteButton} onClick={() => onDeleteItem(category.id, item)} />
              </span>
            </div>
          ))}
          <button type="button" className={styles.addItemButton} onClick={() => onAddItem(category.id)}><Plus size={13} aria-hidden="true" />항목 추가</button>
        </div>
      )}
    </BaseCard>
  );
}
