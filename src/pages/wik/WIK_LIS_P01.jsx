// 역할: 핑거 위키 카테고리와 검색 결과를 탐색하는 목록 화면.
// 사용처: 화면 코드 WIK_LIS_P01
// 담당자: 김재웅

import { useMemo, useState } from "react";
import {BookOpen, Leaf, Sprout} from "lucide-react";
import BaseButton from "../../components/common/base/BaseButton";
import CustomSearchbar from "../../components/common/custom/CustomSearchbar";
import WikiExplorer from "../../components/feature/WIK/LIS/P01/WikiExplorer";
import useNavigationStore from "../../stores/useNavigationStore";
import styles from "./WIK_LIS_P01.module.css";
import AdminHeader from "../../components/common/layout/AdminHeader.jsx";

const WIKI_CATEGORIES = [
  {
    id: "company-life",
    icon: "🏠",
    name: "회사생활 꿀팁",
    items: [
      {
        id: "meeting-room",
        icon: "🗓️",
        title: "회의실 예약하는 법",
        content: "핑거 ERP의 예약 메뉴에서 회의실과 날짜·시간·인원을 선택해 예약해요. 30분 단위로 예약할 수 있어요.",
        attachment: "회의실 예약 화면",
      },
      {
        id: "printer",
        icon: "🖨️",
        title: "복합기 사용법",
        content: "복합기 화면에서 사번으로 로그인한 뒤 출력, 복사, 스캔 중 필요한 기능을 선택해주세요.",
      },
      {
        id: "delivery",
        icon: "📦",
        title: "택배 받는 법",
        content: "도착 알림을 확인하고 1층 수령 장소에서 본인 이름이 적힌 택배를 찾아주세요.",
      },
      {
        id: "wifi",
        icon: "📶",
        title: "사내 와이파이 연결",
        content: "안내받은 사내 계정으로 와이파이에 연결한 뒤, 접속이 되지 않으면 관리자에게 문의해주세요.",
      },
      {
        id: "leave",
        icon: "🌴",
        title: "연차·반차 신청 방법",
        content: "HR 시스템에서 휴가 유형과 일정을 입력해 신청하고, 승인 상태를 확인해주세요.",
      },
      {
        id: "expense",
        icon: "🍴",
        title: "회식비 정산 방법",
        content: "회식비 영수증을 첨부한 뒤 정산 요청을 등록하면 담당자가 확인해요.",
      },
    ],
  },
  {
    id: "senior-tips",
    icon: "🎁",
    name: "선배들의 꿀팁",
    items: [
      {
        id: "work-log",
        icon: "🫧",
        title: "업무일지는 그냥 바로 쓰는 게 편해요",
        content: "업무를 마친 직후 핵심만 기록해두면 나중에 회고와 인수인계가 훨씬 편해져요.",
      },
    ],
  },
  {
    id: "office-map",
    icon: "🗺️",
    name: "회사 지도",
    items: [
      {
        id: "meeting-map",
        icon: "📍",
        title: "회의실 위치 안내",
        content: "회의실은 층별 안내도에서 확인할 수 있으며, 예약 화면에서도 위치를 함께 확인할 수 있어요.",
      },
    ],
  },
  {
    id: "nearby-food",
    icon: "🍜",
    name: "회사 주변 맛집",
    items: [
      {
        id: "lunch-list",
        icon: "🥢",
        title: "점심 맛집 추천",
        content: "도보 거리와 대기 시간을 고려한 팀원 추천 맛집을 확인해보세요.",
      },
    ],
  },
  {
    id: "forest",
    icon: "🌲",
    name: "포레스트 & 레벨업",
    items: [
      {
        id: "forest-intro",
        icon: "🌲",
        title: "포레스트(Forest)가 뭔가요?",
        content: "포레스트는 회사 생활에 필요한 지식과 문화를 배우고, 나만의 여정을 완성해가는 성장 공간이에요.",
      },
      {
        id: "forest-level",
        icon: "🔗",
        title: "포레스트와 레벨업은 무슨 관계예요?",
        content: "포레스트에서 항목을 완료할수록 여정 진행도가 쌓이고 다음 레벨의 콘텐츠를 만날 수 있어요.",
      },
    ],
  },
];

export default function WIK_LIS_P01() {
  const goForward = useNavigationStore((state) => state.goForward);
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
        onClick={() => goForward("PTH_MAP_P01")}
      />
    </main>
  );
}
