// 역할: 위키 카테고리와 하위 항목을 등록·수정·삭제하는 관리자 화면.
// 사용처: 화면 코드 ADM_WIK_P01
// 담당자: 김재웅

import { useState } from "react";
import { Leaf, Plus } from "lucide-react";
import BaseButton from "../../components/common/base/BaseButton";
import AdminHeader from "../../components/common/layout/AdminHeader";
import BottomTabNav from "../../components/common/layout/BottomTabNav";
import AdminWikiCategoryList from "../../components/feature/ADM/WIK/P01/AdminWikiCategoryList";
import WikiCategoryForm from "../../components/feature/ADM/WIK/P01/WikiCategoryForm";
import WikiItemForm from "../../components/feature/ADM/WIK/P01/WikiItemForm";
import { useDialog } from "../../hooks/useDialog";
import useNavigationStore from "../../stores/useNavigationStore";
import styles from "./ADM_WIK_P01.module.css";

const ADMIN_TABS = [
  { path: "ADM_EMP_P01", label: "입사자", icon: "user" },
  { path: "ADM_WIK_P01", label: "위키관리", icon: "wiki" },
  { path: "ADM_PRG_P01", label: "진행현황", icon: "progress" },
  { path: "ADM_HRC_P01", label: "HR확인", icon: "bell" },
];

const INITIAL_CATEGORIES = [
  {
    id: "company-life",
    icon: "🏠",
    name: "회사생활 꿀팁",
    items: [
      { id: "meeting", icon: "🗓️", title: "회의실 예약하는 법", content: "회의실 예약 시스템에서 날짜와 시간을 선택해주세요.", images: [] },
      { id: "printer", icon: "🖨️", title: "복합기 사용법", content: "사번으로 로그인한 뒤 원하는 기능을 선택해주세요.", images: [] },
      { id: "delivery", icon: "📦", title: "택배 받는 법", content: "수령 장소와 수령 시간을 확인해주세요.", images: [] },
      { id: "wifi", icon: "📶", title: "사내 와이파이 연결", content: "안내받은 계정으로 사내 와이파이에 연결합니다.", images: [] },
      { id: "leave", icon: "🌴", title: "연차·반차 신청 방법", content: "HR 시스템에서 휴가 유형과 일정을 입력합니다.", images: [] },
      { id: "lunch", icon: "🍴", title: "회식비 정산 방법", content: "영수증을 첨부해 정산을 요청합니다.", images: [] },
    ],
  },
  { id: "benefits", icon: "🎁", name: "선배들의 꿀팁", items: [] },
  { id: "map", icon: "🗺️", name: "회사 지도", items: [] },
  { id: "welfare", icon: "🍜", name: "회사 주변 맛집", items: [] },
  { id: "forest", icon: "🌲", name: "포레스트 & 레벨업", items: [] },
];

export default function ADM_WIK_P01() {
  const goForward = useNavigationStore((state) => state.goForward);
  const { showConfirm, showDialog } = useDialog();
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  const moveTo = (screenCode) => {
    goForward(screenCode);
  };

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
    <div className={styles.page}>
      <AdminHeader
        title={<span className={styles.brand}><Leaf size={22} aria-hidden="true" />핑거저니 관리자</span>}
        onLogout={() => {}}
      />
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
      <BottomTabNav tabs={ADMIN_TABS} active="ADM_WIK_P01" onChange={moveTo} />
    </div>
  );
}
