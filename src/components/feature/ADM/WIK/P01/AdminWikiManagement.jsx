import { Plus } from "lucide-react";
import BaseButton from "../../../../common/base/BaseButton";
import { useDialog } from "../../../../../hooks/useDialog";
import { parseApiError } from "../../../../../utils/apiErrorUtils";
import AdminPageLayout from "../../common/AdminPageLayout";
import AdminWikiCategoryList from "./AdminWikiCategoryList";
import WikiCategoryForm from "./WikiCategoryForm";
import WikiItemForm from "./WikiItemForm";
import useWikiManagement from "./useWikiManagement";
import styles from "./AdminWikiManagement.module.css";

export default function AdminWikiManagement({ onNavigate }) {
  const { showConfirm, showDialog } = useDialog();
  const {
    categories,
    isLoaded,
    errorMessage,
    setErrorMessage,
    createCategory,
    createItem,
    updateItem,
    loadItemForEdit,
    removeCategory,
    removeItem,
  } = useWikiManagement();

  const openCategoryForm = () => {
    showDialog("bottom", ({ close }) => (
      <WikiCategoryForm
        onCancel={() => close(false)}
        onSubmit={async (values) => {
          // 서버가 카테고리명 중복(WIK_002) 등을 검사해서 오류 문구를 돌려주면 폼 안에 그대로 보여준다.
          const error = await createCategory(values);
          if (error) return error;

          close(true);
          return undefined;
        }}
      />
    ));
  };

  const openItemForm = async (categoryId, item = null) => {
    setErrorMessage("");

    let initialItem = null;
    if (item) {
      try {
        initialItem = await loadItemForEdit(item);
      } catch (err) {
        setErrorMessage(parseApiError(err).message);
        return;
      }
    }

    showDialog("bottom", ({ close }) => (
      <WikiItemForm
        item={initialItem}
        onCancel={() => close(false)}
        onSubmit={async (values) => {
          const error = item
            ? await updateItem(item.id, values)
            : await createItem(categoryId, values);
          if (error) return error;

          close(true);
          return undefined;
        }}
      />
    ));
  };

  const deleteCategory = (category) => {
    showConfirm(`${category.name}을(를) 삭제할까요?`, () => {
      removeCategory(category.id);
    }, { confirmLabel: "삭제", cancelLabel: "취소", messageClassName: styles.deleteMessage });
  };

  const deleteItem = (categoryId, item) => {
    showConfirm(`${item.title}을(를) 삭제할까요?`, () => {
      removeItem(item.id);
    }, { confirmLabel: "삭제", cancelLabel: "취소", messageClassName: styles.deleteMessage });
  };

  return (
    <AdminPageLayout activeScreenCode="ADM_WIK_P01" onNavigate={onNavigate}>
      <main className={styles.content}>
        <div className={styles.sectionHeader}>
          <h1>위키 관리</h1>
          <BaseButton label={<><Plus size={13} aria-hidden="true" />위키 등록</>} variant="secondary" className={styles.addButton} onClick={openCategoryForm} />
        </div>
        {errorMessage && <p role="alert">{errorMessage}</p>}
        {isLoaded && !errorMessage && categories.length === 0 && <p>등록된 위키가 없어요.</p>}
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
