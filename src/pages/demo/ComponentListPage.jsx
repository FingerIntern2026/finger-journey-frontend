// 페이지명: ComponentListPage (TODO: 정식 화면명 확정되면 교체)
// 역할: 프로젝트에 준비된 컴포넌트들을 모아 보여주는 데모 페이지. 기존엔 30개 가까운
//       컴포넌트가 한 화면에 전부 펼쳐져 있어서 원하는 걸 찾기 불편하다는 피드백을 받아,
//       "공통 컴포넌트(base/)" / "커스텀 컴포넌트(custom·layout/, 실제 온보딩 플로우
//       순서로 배치)" 두 탭 + 아코디언(버튼 눌러야 펼쳐짐) 구조로 재구성함.
//       각 컴포넌트가 어떤 props를 받고 어떻게 동작하는지 확인하는 용도이며,
//       실제 로직 없이 동작 확인용 임시 state만 사용
// 사용처: DemoIndexPage에서 "② 컴포넌트리스트" 버튼(goTo(ROUTE_PATHS.DEMO_COMPONENTS))으로 진입
// url: /demo/components
// 담당자:

import { useState } from "react";

import BaseButton from "../../components/common/base/BaseButton";
import BaseBadge from "../../components/common/base/BaseBadge";
import BaseInput from "../../components/common/base/BaseInput";
import BaseSelect from "../../components/common/base/BaseSelect";
import BaseTextArea from "../../components/common/base/BaseTextArea";
import BaseCheckbox from "../../components/common/base/BaseCheckbox";
import BaseProgressBar from "../../components/common/base/BaseProgressBar";
import { startLoading, stopLoading } from "../../utils/loadingStore";

import CustomAuthForm from "../../components/common/custom/CustomAuthForm";
import IntroScreen from "../../components/common/custom/IntroScreen";
import OfficeFloorMap from "../../components/common/custom/OfficeFloorMap";
import LoginWebviewEmbed from "../../components/common/custom/LoginWebviewEmbed";
import CustomChecklist from "../../components/common/custom/CustomChecklist";
import PathMapHeader from "../../components/common/layout/PathMapHeader";
import ContentCarousel from "../../components/common/layout/ContentCarousel";
import CustomProgressIndicator from "../../components/common/custom/CustomProgressIndicator";
import StageClearBanner from "../../components/common/custom/StageClearBanner";
import QuizClearScreen from "../../components/common/custom/QuizClearScreen";
import AcrosticInputForm from "../../components/common/custom/AcrosticInputForm";
import AcrosticResultScreen from "../../components/common/custom/AcrosticResultScreen";
import WikiCategoryPanel from "../../components/common/custom/WikiCategoryPanel";
import CustomSearchbar, {
  highlightText,
} from "../../components/common/custom/CustomSearchbar";
import CustomImageUploader from "../../components/common/custom/CustomImageUploader";
import AdminHeader from "../../components/common/layout/AdminHeader";
import BottomTabNav from "../../components/common/layout/BottomTabNav";
import ChatEntryButton from "../../components/common/layout/ChatEntryButton";
import Header from "../../components/common/layout/Header";
import PageLayout from "../../components/common/layout/PageLayout.jsx";
import useNavigation from "../../hooks/useNavigation";

import styles from "./componentList.module.css";

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect width='160' height='160' fill='%23eee'/%3E%3C/svg%3E";

const ADMIN_TABS = [
  { icon: "user", label: "입사자", path: "/admin/employee" },
  { icon: "wiki", label: "위키관리", path: "/admin/wiki" },
  { icon: "progress", label: "진행현황", path: "/admin/progress" },
  { icon: "bell", label: "HR확인", path: "/admin/hr" },
];

// 한 번 눌러서 펼치고, 다시 누르면 접히는 아코디언 항목
// render를 children이 아니라 함수(prop)로 받는 이유:
// {item.render()}처럼 JSX children으로 미리 호출해서 넘기면, 그 호출 자체는
// "부모(ComponentListPage)가 리렌더될 때" 일어나 버려서 이 아코디언이 닫혀있어도
// 매번 실행됨 (React는 프로퍼티/children을 넘기기 전에 이미 평가를 끝냄).
// isOpen일 때만 실제로 호출해야 닫힌 항목의 render는 아예 실행되지 않음
function AccordionItem({ id, title, description, isOpen, onToggle, render }) {
  return (
    <div className={styles.accordionItem}>
      <button
        type="button"
        className={`${styles.accordionHeader} ${isOpen ? styles.accordionHeaderOpen : ""}`}
        onClick={() => onToggle(id)}
        data-trace={`아코디언 ${isOpen ? "접기" : "펼치기"}: ${title} (openIds Set ${isOpen ? "삭제" : "추가"})`}
      >
        <span>{title}</span>
        <span className={`${styles.accordionChevron} ${isOpen ? styles.accordionChevronOpen : ""}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className={styles.accordionBody}>
          {description && <p className={styles.accordionDescription}>{description}</p>}
          {render()}
        </div>
      )}
    </div>
  );
}

export default function ComponentListPage() {
  const { goBack } = useNavigation();
  const [tab, setTab] = useState("base"); // "base" | "custom"
  const [openIds, setOpenIds] = useState(new Set());

  const toggleOpen = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── 데모용 임시 state (기존 컴포넌트 그대로) ──
  const [checked, setChecked] = useState(false);
  const [activeTab, setActiveTab] = useState(ADMIN_TABS[0].path);
  const [inputValue, setInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const selectOptions = [
    { value: "dev1", label: "개발1팀" },
    { value: "dev2", label: "개발2팀" },
    { value: "hr", label: "인사팀" },
  ];
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, label: "노트북 지급 확인", checked: false },
    { id: 2, label: "사원증 발급 확인", checked: true },
    { id: 3, label: "계정 발급 확인", checked: false },
  ]);
  const handleToggleChecklist = (itemId) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item))
    );
  };
  const [uploadedImages, setUploadedImages] = useState([{ id: 1, url: PLACEHOLDER_IMG }]);
  const handleAddImage = () => {
    setUploadedImages((prev) => [...prev, { id: Date.now(), url: PLACEHOLDER_IMG }]);
  };
  const handleRemoveImage = (imageId) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  // ── 공통 컴포넌트 (base/) : 특정 화면에 종속되지 않는 범용 UI 원자단위 ──
  const baseItems = [
    {
      id: "BaseButton",
      render: () => (
        <>
          <BaseButton label="기본 버튼" onClick={() => alert("클릭됨")} />
          <BaseButton label="위험 버튼" variant="danger" onClick={() => {}} />
          <BaseButton label="비활성 버튼" disabled />
        </>
      ),
    },
    {
      id: "BaseBadge",
      render: () => (
        <>
          <BaseBadge label="진행중" color="blue" />
          <BaseBadge label="완료" color="green" />
        </>
      ),
    },
    {
      id: "BaseInput",
      render: () => (
        <BaseInput label="이름" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      ),
    },
    {
      id: "BaseSelect",
      render: () => <BaseSelect label="조직 선택" options={selectOptions} />,
    },
    {
      id: "BaseTextArea",
      render: () => <BaseTextArea label="메모" />,
    },
    {
      id: "BaseCheckbox",
      render: () => <BaseCheckbox checked={checked} onChange={() => setChecked(!checked)} />,
    },
    {
      id: "BaseProgressBar",
      render: () => <BaseProgressBar current={4} total={10} />,
    },
  ];

  // ── 커스텀 컴포넌트 (custom/, layout/) : 실제 온보딩 플로우 순서로 배치
  // (프리보딩 → 체크인 → 오솔길 → 위키 → 관리자/챗봇), 각 화면에서 실제로 어떻게 쓰이는지 확인 가능
  const customGroups = [
    {
      title: "① 프리보딩 (입사 전)",
      items: [
        {
          id: "CustomAuthForm-preboarding",
          title: "CustomAuthForm (필드 2개 — 프리보딩 인증)",
          description: "입사 전, 사원번호+생년월일로 본인 확인 후 온보딩 자료를 미리 열람하는 단계",
          render: () => (
            <CustomAuthForm
              field1Label="사원번호를 입력하세요"
              field2Label="생년월일 6자리"
              field1Length={8}
              field2Length={6}
              buttonLabel="인증하기"
              onSubmit={(no, birth) => alert(`인증 시도: ${no} / ${birth}`)}
            />
          ),
        },
      ],
    },
    {
      title: "② 온보딩 — 체크인 / 가방싸기",
      items: [
        {
          id: "Header",
          title: "Header",
          description: "입사 첫날부터 등장하는 공통 헤더",
          render: () => (
            <Header label="가방 싸는 중" current={2} total={5} onBack={() => alert("뒤로가기")} />
          ),
        },
        {
          id: "CustomAuthForm-checkin",
          title: "CustomAuthForm (필드 1개 — 체크인 암호)",
          render: () => (
            <CustomAuthForm
              field1Label="체크인 암호를 입력하세요"
              field1Length={4}
              buttonLabel="확인"
              onSubmit={(code) => alert(`암호 확인: ${code}`)}
            />
          ),
        },
        {
          id: "IntroScreen",
          title: "IntroScreen",
          render: () => (
            <IntroScreen
              title="가방 싸기 전에"
              description="입사 전 준비물을 미리 안내해드릴게요."
              buttonLabel="다음"
              onButtonClick={() => alert("다음 화면으로 이동")}
            />
          ),
        },
        {
          id: "OfficeFloorMap",
          title: "OfficeFloorMap",
          render: () => (
            <OfficeFloorMap officeName="종로 포레스트" onBackClick={() => alert("뒤로 가기")} />
          ),
        },
        {
          id: "LoginWebviewEmbed",
          title: "LoginWebviewEmbed",
          render: () => (
            <LoginWebviewEmbed
              src="https://gw.fingerservice.co.kr/"
              title="ERP 로그인"
              guideText="아래 화면에서 로그인을 완료해주세요."
              height={420}
            />
          ),
        },
        {
          id: "CustomChecklist",
          title: "CustomChecklist",
          render: () => (
            <CustomChecklist items={checklistItems} onToggle={handleToggleChecklist} />
          ),
        },
      ],
    },
    {
      title: "③ 오솔길 (온보딩 콘텐츠)",
      items: [
        {
          id: "PathMapHeader",
          title: "PathMapHeader",
          render: () => <PathMapHeader title="오솔길" currentStep={7} totalStep={10} />,
        },
        {
          id: "ContentCarousel",
          title: "ContentCarousel",
          render: () => <ContentCarousel imageSrc={PLACEHOLDER_IMG} imageAlt="씨앗 2010" />,
        },
        {
          id: "CustomProgressIndicator",
          title: "CustomProgressIndicator",
          render: () => <CustomProgressIndicator current={7} total={10} />,
        },
        {
          id: "StageClearBanner-caption",
          title: "StageClearBanner (캡션 케이스 — 법인카드)",
          render: () => (
            <StageClearBanner
              stageIcon={PLACEHOLDER_IMG}
              stageTitle="법인카드"
              stageSubtitle="카드 수령 완료"
              clearCaption="곧 카드가 배송될 예정이에요."
              onButtonClick={() => alert("맵으로 돌아가기")}
            />
          ),
        },
        {
          id: "StageClearBanner-link",
          title: "StageClearBanner (링크 케이스 — 포레스트)",
          render: () => (
            <StageClearBanner
              stageIcon={PLACEHOLDER_IMG}
              stageTitle="FOREST"
              linkLabel="포레스트 바로가기"
              onLinkClick={() => alert("포레스트로 이동")}
              onButtonClick={() => alert("맵으로 돌아가기")}
            />
          ),
        },
        {
          id: "QuizClearScreen",
          title: "QuizClearScreen",
          render: () => (
            <QuizClearScreen illustrationSrc={PLACEHOLDER_IMG} onButtonClick={() => alert("맵으로 돌아가기")} />
          ),
        },
        {
          id: "AcrosticInputForm",
          title: "AcrosticInputForm",
          render: () => (
            <AcrosticInputForm name="김핑거" onSuccess={(lines) => alert(`저장됨: ${lines.join(" / ")}`)} />
          ),
        },
        {
          id: "AcrosticResultScreen",
          title: "AcrosticResultScreen",
          render: () => (
            <AcrosticResultScreen
              userBadgeText="김핑거 #오솔길완주 #3행시"
              lines={[
                { letter: "김", text: "김밥처럼 든든하게" },
                { letter: "핑", text: "핑거저니와 함께" },
                { letter: "거", text: "거침없이 성장할게요" },
              ]}
              onButtonClick={() => alert("AI 완주 리포트 보기")}
            />
          ),
        },
      ],
    },
    {
      title: "④ 핑거위키",
      items: [
        {
          id: "WikiCategoryPanel",
          title: "WikiCategoryPanel",
          render: () => (
            <WikiCategoryPanel
              categories={[
                {
                  id: "company-map",
                  name: "회사 지도",
                  icon: { type: "emoji", emoji: "🗺️" },
                  count: 1,
                  items: [{ id: 1, title: "2층 회의실 위치" }],
                },
                { id: "welfare", name: "복지제도", icon: null, count: 0, items: [] },
              ]}
              onItemClick={(item) => alert(`선택: ${item.title}`)}
            />
          ),
        },
        {
          id: "CustomSearchbar",
          title: "CustomSearchbar",
          render: () => (
            <>
              <CustomSearchbar value={searchKeyword} onChange={setSearchKeyword} onSearch={setSearchKeyword} />
              <p className={styles.accordionDescription}>검색 결과 하이라이트 예시:</p>
              <p>{highlightText("회의실 예약하는 법", searchKeyword)}</p>
            </>
          ),
        },
        {
          id: "CustomImageUploader",
          title: "CustomImageUploader",
          render: () => (
            <CustomImageUploader
              images={uploadedImages}
              onAddImage={handleAddImage}
              onRemoveImage={handleRemoveImage}
            />
          ),
        },
      ],
    },
    {
      title: "⑤ 관리자 & 챗봇",
      items: [
        {
          id: "AdminHeader",
          title: "AdminHeader",
          render: () => <AdminHeader onLogout={() => alert("로그아웃")} />,
        },
        {
          id: "BottomTabNav",
          title: "BottomTabNav",
          render: () => (
            <BottomTabNav tabs={ADMIN_TABS} active={activeTab} onChange={setActiveTab} />
          ),
        },
        {
          id: "ChatEntryButton",
          title: "ChatEntryButton",
          description: "실제로는 모든 데모 화면 우측 하단에 항상 떠 있음",
          render: () => <ChatEntryButton onClick={() => alert("챗봇 열기")} unreadCount={2} />,
        },
        {
          id: "GlobalLoading",
          title: "GlobalLoading",
          description: "규원님 작업 — 전역 로딩 오버레이. startLoading()/stopLoading() 카운터로 여러 요청이 겹쳐도 하나만 뜸 (App.jsx 최상단에 항상 마운트돼 있음)",
          render: () => (
            <BaseButton
              label="로딩 테스트"
              onClick={() => {
                startLoading();
                setTimeout(() => stopLoading(), 2000);
              }}
            />
          ),
        },
      ],
    },
  ];

  return (
    <PageLayout header={<Header label="컴포넌트 목록" onBack={goBack} />}>
    <div className={styles.page}>
      <p className={styles.pageHint}>버튼을 눌러 원하는 컴포넌트만 펼쳐서 테스트하세요.</p>

      <div className={styles.tabRow}>
        <button
          type="button"
          className={`${styles.tabButton} ${tab === "base" ? styles.tabButtonActive : ""}`}
          onClick={() => setTab("base")}
          data-trace="탭 전환: 공통 컴포넌트 (tab state = 'base')"
        >
          공통 컴포넌트
        </button>
        <button
          type="button"
          className={`${styles.tabButton} ${tab === "custom" ? styles.tabButtonActive : ""}`}
          onClick={() => setTab("custom")}
          data-trace="탭 전환: 커스텀 컴포넌트 (tab state = 'custom')"
        >
          커스텀 컴포넌트
        </button>
      </div>

      {tab === "base" && (
        <div className={styles.accordionList}>
          {baseItems.map((item) => (
            <AccordionItem
              key={item.id}
              id={item.id}
              title={item.id}
              description={item.description}
              isOpen={openIds.has(item.id)}
              onToggle={toggleOpen}
              render={item.render}
            />
          ))}
        </div>
      )}

      {tab === "custom" &&
        customGroups.map((group) => (
          <div key={group.title}>
            <p className={styles.groupTitle}>{group.title}</p>
            <div className={styles.accordionList}>
              {group.items.map((item) => (
                <AccordionItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  isOpen={openIds.has(item.id)}
                  onToggle={toggleOpen}
                  render={item.render}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
    </PageLayout>
  );
}