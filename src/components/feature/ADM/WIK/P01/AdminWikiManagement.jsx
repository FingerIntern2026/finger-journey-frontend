import { useState } from "react";
import { Plus } from "lucide-react";
import BaseButton from "../../../../common/base/BaseButton";
import { useDialog } from "../../../../../hooks/useDialog";
import AdminPageLayout from "../../common/AdminPageLayout";
import AdminWikiCategoryList from "./AdminWikiCategoryList";
import WikiCategoryForm from "./WikiCategoryForm";
import WikiItemForm from "./WikiItemForm";
import { INITIAL_CATEGORIES } from "./wikiManagementData";
import styles from "./AdminWikiManagement.module.css";

export default function AdminWikiManagement({ onNavigate }) {
  const { showConfirm, showDialog } = useDialog();
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  const openCategoryForm = () => {
    showDialog("bottom", ({ close }) => (
      <WikiCategoryForm
        onCancel={() => close(false)}
        onSubmit={({ icon, name }) => {
          setCategories((previous) => [...previous, { id: `category-${Date.now()}`, icon, name, items: [] }]);
          close(true);
        }}
      />
    ));
  };

  const openItemForm = (categoryId, item = null) => {
    showDialog("bottom", ({ close }) => (
      <WikiItemForm
        item={item}
        onCancel={() => close(false)}
        onSubmit={(values) => {
          setCategories((previous) => previous.map((category) => {
            if (category.id !== categoryId) return category;
            const nextItem = { ...values, id: item?.id ?? `item-${Date.now()}` };
            const nextItems = item
              ? category.items.map((currentItem) => (currentItem.id === item.id ? nextItem : currentItem))
              : [...category.items, nextItem];
            return { ...category, items: nextItems };
          }));
          close(true);
        }}
      />
    ));
  };

  const deleteCategory = (category) => {
    showConfirm(`${category.name}을(를) 삭제할까요?`, () => {
      setCategories((previous) => previous.filter((item) => item.id !== category.id));
    }, { confirmLabel: "저장", cancelLabel: "취소", messageClassName: styles.deleteMessage });
  };

  const deleteItem = (categoryId, item) => {
    showConfirm(`${item.title}을(를) 삭제할까요?`, () => {
      setCategories((previous) => previous.map((category) => (
        category.id === categoryId
          ? { ...category, items: category.items.filter((currentItem) => currentItem.id !== item.id) }
          : category
      )));
    }, { confirmLabel: "저장", cancelLabel: "취소", messageClassName: styles.deleteMessage });
  };

  return (
    <AdminPageLayout activeScreenCode="ADM_WIK_P01" onNavigate={onNavigate}>
      <main className={styles.content}>
        <div className={styles.sectionHeader}>
          <h1>위키 관리</h1>
          <BaseButton label={<><Plus size={13} aria-hidden="true" />위키 등록</>} variant="secondary" className={styles.addButton} onClick={openCategoryForm} />
        </div>
        <AdminWikiCategoryList
          categories={categories}
          onAddItem={(categoryId) => openItemForm(categoryId)}
          onEditItem={(categoryId, item) => openItemForm(categoryId, item)}
          onDeleteCategory={deleteCategory}
          onDeleteItem={deleteItem}
        />
      </main>
    </AdminPageLayout>
  );
}
