// ComponentListPage.jsx의 역할
// 프로젝트에 준비된 공통 컴포넌트들을 한 화면에 모아 보여주는 데모 페이지
// base(범용) 다음부터는 실제 온보딩 플로우 순서(프리보딩→체크인→오솔길→위키→관리자/챗봇)로
// 배치해서, 각 컴포넌트가 실제로 어느 화면에서 쓰이는지 순서대로 확인할 수 있게 함
// 각 컴포넌트가 어떤 props를 받고 어떻게 동작하는지 확인하는 용도
// 실제 로직 없이 동작 확인용 임시 state만 사용

import { useState } from "react";

import BaseButton from "../../components/common/base/BaseButton";
import BaseBadge from "../../components/common/base/BaseBadge";
import BaseInput from "../../components/common/base/BaseInput";
import BaseSelect from "../../components/common/base/BaseSelect";
import BaseTextArea from "../../components/common/base/BaseTextArea";
import BaseCard from "../../components/common/base/BaseCard";
import BaseCheckbox from "../../components/common/base/BaseCheckbox";
import BaseProgressBar from "../../components/common/base/BaseProgressBar";

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

// 실제 일러스트 에셋이 아직 없어서 데모용 회색 박스 placeholder 사용
const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect width='160' height='160' fill='%23eee'/%3E%3C/svg%3E";

const ADMIN_TABS = [
  { icon: "user", label: "입사자", path: "/admin/employee" },
  { icon: "wiki", label: "위키관리", path: "/admin/wiki" },
  { icon: "progress", label: "진행현황", path: "/admin/progress" },
  { icon: "bell", label: "HR확인", path: "/admin/hr" },
];

// 섹션 제목 + "어디서 쓰는지" 설명을 한 세트로 묶어서 반복 사용
const FlowSection = ({ title, description, children }) => (
  <div style={{ marginTop: "40px" }}>
    <h2>{title}</h2>
    <p className="muted">{description}</p>
    {children}
  </div>
);

export default function ComponentListPage() {
  // BaseCheckbox는 checked를 직접 관리해줘야 하는 controlled 컴포넌트라 state 필요
  const [checked, setChecked] = useState(false);

  // BottomTabNav 데모용 활성 탭 state
  const [activeTab, setActiveTab] = useState(ADMIN_TABS[0].path);

  // BaseInput도 controlled로 써볼 수 있게 state 준비
  const [inputValue, setInputValue] = useState("");

  // BaseSelect용 임시 옵션 목록
  const selectOptions = [
    { value: "dev1", label: "개발1팀" },
    { value: "dev2", label: "개발2팀" },
    { value: "hr", label: "인사팀" },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");

  // CustomChecklist 데모용 체크 상태
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, label: "노트북 지급 확인", checked: false },
    { id: 2, label: "사원증 발급 확인", checked: true },
    { id: 3, label: "계정 발급 확인", checked: false },
  ]);
  const handleToggleChecklist = (itemId) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // CustomImageUploader 데모용 업로드 이미지 상태
  const [uploadedImages, setUploadedImages] = useState([
    { id: 1, url: PLACEHOLDER_IMG },
  ]);
  const handleAddImage = () => {
    setUploadedImages((prev) => [
      ...prev,
      { id: Date.now(), url: PLACEHOLDER_IMG },
    ]);
  };
  const handleRemoveImage = (imageId) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>공통 컴포넌트 (base/)</h2>
      <p className="muted">
        범용 UI 원자단위 — 특정 화면/기능에 종속되지 않음. 아래 플로우 전체에서 재사용됨
      </p>

      <BaseCard>
        <h3>BaseButton</h3>
        <BaseButton label="기본 버튼" onClick={() => alert("클릭됨")} />
        <BaseButton label="위험 버튼" variant="danger" onClick={() => {}} />
        <BaseButton label="비활성 버튼" disabled />
      </BaseCard>

      <BaseCard>
        <h3>BaseBadge</h3>
        <BaseBadge label="진행중" color="blue" />
        <BaseBadge label="완료" color="green" />
      </BaseCard>

      <BaseCard>
        <h3>BaseInput</h3>
        <BaseInput
          label="이름"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </BaseCard>

      <BaseCard>
        <h3>BaseSelect</h3>
        <BaseSelect label="조직 선택" options={selectOptions} />
      </BaseCard>

      <BaseCard>
        <h3>BaseTextArea</h3>
        <BaseTextArea label="메모" />
      </BaseCard>

      <BaseCard>
        <h3>BaseCheckbox</h3>
        <BaseCheckbox
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </BaseCard>

      <BaseCard>
        <h3>BaseProgressBar</h3>
        <BaseProgressBar current={4} total={10} />
      </BaseCard>

      <FlowSection
        title="① 프리보딩 (입사 전)"
        description="입사 전, 사원번호+생년월일로 본인 확인 후 온보딩 자료를 미리 열람하는 단계"
      >
        <BaseCard>
          <h3>CustomAuthForm (필드 2개 — 프리보딩 인증)</h3>
          <CustomAuthForm
            field1Label="사원번호를 입력하세요"
            field2Label="생년월일 6자리"
            field1Length={8}
            field2Length={6}
            buttonLabel="인증하기"
            onSubmit={(no, birth) => alert(`인증 시도: ${no} / ${birth}`)}
          />
        </BaseCard>
      </FlowSection>

      <FlowSection
        title="② 온보딩 — 체크인 / 가방싸기"
        description="입사 첫날 계정 발급, 좌석 확인, 준비물 체크 등을 진행하는 단계. 이 단계부터 공통 Header가 등장함"
      >
        <BaseCard>
          <h3>Header</h3>
          <Header
            label="가방 싸는 중"
            current={2}
            total={5}
            onBack={() => alert("뒤로가기")}
          />
        </BaseCard>

        <BaseCard>
          <h3>CustomAuthForm (필드 1개 — 체크인 암호)</h3>
          <CustomAuthForm
            field1Label="체크인 암호를 입력하세요"
            field1Length={4}
            buttonLabel="확인"
            onSubmit={(code) => alert(`암호 확인: ${code}`)}
          />
        </BaseCard>

        <BaseCard>
          <h3>IntroScreen</h3>
          <IntroScreen
            title="가방 싸기 전에"
            description="입사 전 준비물을 미리 안내해드릴게요."
            buttonLabel="다음"
            onButtonClick={() => alert("다음 화면으로 이동")}
          />
        </BaseCard>

        <BaseCard>
          <h3>OfficeFloorMap</h3>
          <OfficeFloorMap
            officeName="종로 포레스트"
            onBackClick={() => alert("뒤로 가기")}
          />
        </BaseCard>

        <BaseCard>
          <h3>LoginWebviewEmbed</h3>
          <LoginWebviewEmbed
            src="https://gw.fingerservice.co.kr/"
            title="ERP 로그인"
            guideText="아래 화면에서 로그인을 완료해주세요."
            height={420}
          />
        </BaseCard>

        <BaseCard>
          <h3>CustomChecklist</h3>
          <CustomChecklist
            items={checklistItems}
            onToggle={handleToggleChecklist}
          />
        </BaseCard>
      </FlowSection>

      <FlowSection
        title="③ 오솔길 (온보딩 콘텐츠)"
        description="핑거이야기/취업규칙/법인카드 등 8개 스테이지를 순서대로 진행하며 배지·퀴즈·3행시로 마무리하는 단계"
      >
        <BaseCard>
          <h3>PathMapHeader</h3>
          <PathMapHeader title="오솔길" currentStep={7} totalStep={10} />
        </BaseCard>

        <BaseCard>
          <h3>ContentCarousel</h3>
          <ContentCarousel imageSrc={PLACEHOLDER_IMG} imageAlt="씨앗 2010" />
        </BaseCard>

        <BaseCard>
          <h3>CustomProgressIndicator</h3>
          <CustomProgressIndicator current={7} total={10} />
        </BaseCard>

        <BaseCard>
          <h3>StageClearBanner (캡션 케이스 — 법인카드)</h3>
          <StageClearBanner
            stageIcon={PLACEHOLDER_IMG}
            stageTitle="법인카드"
            stageSubtitle="카드 수령 완료"
            clearCaption="곧 카드가 배송될 예정이에요."
            onButtonClick={() => alert("맵으로 돌아가기")}
          />
        </BaseCard>

        <BaseCard>
          <h3>StageClearBanner (링크 케이스 — 포레스트)</h3>
          <StageClearBanner
            stageIcon={PLACEHOLDER_IMG}
            stageTitle="FOREST"
            linkLabel="포레스트 바로가기"
            onLinkClick={() => alert("포레스트로 이동")}
            onButtonClick={() => alert("맵으로 돌아가기")}
          />
        </BaseCard>

        <BaseCard>
          <h3>QuizClearScreen</h3>
          <QuizClearScreen
            illustrationSrc={PLACEHOLDER_IMG}
            onButtonClick={() => alert("맵으로 돌아가기")}
          />
        </BaseCard>

        <BaseCard>
          <h3>AcrosticInputForm</h3>
          <AcrosticInputForm
            name="김핑거"
            onSuccess={(lines) => alert(`저장됨: ${lines.join(" / ")}`)}
          />
        </BaseCard>

        <BaseCard>
          <h3>AcrosticResultScreen</h3>
          <AcrosticResultScreen
            userBadgeText="김핑거 #오솔길완주 #3행시"
            lines={[
              { letter: "김", text: "김밥처럼 든든하게" },
              { letter: "핑", text: "핑거저니와 함께" },
              { letter: "거", text: "거침없이 성장할게요" },
            ]}
            onButtonClick={() => alert("AI 완주 리포트 보기")}
          />
        </BaseCard>
      </FlowSection>

      <FlowSection
        title="④ 핑거위키"
        description="오솔길 완주 이후에도 상시로 사내 정보를 검색·열람하는 단계"
      >
        <BaseCard>
          <h3>WikiCategoryPanel</h3>
          <WikiCategoryPanel
            categories={[
              {
                id: "company-map",
                name: "회사 지도",
                icon: { type: "emoji", emoji: "🗺️" },
                count: 1,
                items: [{ id: 1, title: "2층 회의실 위치" }],
              },
              {
                id: "welfare",
                name: "복지제도",
                icon: null,
                count: 0,
                items: [],
              },
            ]}
            onItemClick={(item) => alert(`선택: ${item.title}`)}
          />
        </BaseCard>

        <BaseCard>
          <h3>CustomSearchbar</h3>
          <CustomSearchbar
            value={searchKeyword}
            onChange={setSearchKeyword}
            onSearch={setSearchKeyword}
          />
          <p className="muted">검색 결과 하이라이트 예시:</p>
          <p>{highlightText("회의실 예약하는 법", searchKeyword)}</p>
        </BaseCard>

        <BaseCard>
          <h3>CustomImageUploader</h3>
          <CustomImageUploader
            images={uploadedImages}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
          />
        </BaseCard>
      </FlowSection>

      <FlowSection
        title="⑤ 관리자 & 챗봇"
        description="HR 담당자가 입사자를 관리하는 화면, 그리고 전 화면에서 접근 가능한 AI 챗봇"
      >
        <BaseCard>
          <h3>AdminHeader</h3>
          <AdminHeader onLogout={() => alert("로그아웃")} />
        </BaseCard>

        <BaseCard>
          <h3>BottomTabNav</h3>
          <BottomTabNav
            tabs={ADMIN_TABS}
            active={activeTab}
            onChange={setActiveTab}
          />
        </BaseCard>

        <BaseCard>
          <h3>ChatEntryButton</h3>
          <p className="muted">
            핑거위키 목록 화면 우측 하단에 플로팅으로 떠있습니다.
          </p>
          <ChatEntryButton
            onClick={() => alert("챗봇 열기")}
            unreadCount={2}
          />
        </BaseCard>
      </FlowSection>
    </div>
  );
}
