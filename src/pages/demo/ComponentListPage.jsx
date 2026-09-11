// ComponentListPage.jsx의 역할
// 프로젝트에 준비된 공통 base 컴포넌트들을 한 화면에 모아 보여주는 데모 페이지
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
import AdminHeader from "../../components/common/layout/AdminHeader";
import BottomTabNav from "../../components/common/layout/BottomTabNav";
import ChatEntryButton from "../../components/common/layout/ChatEntryButton";
import PathMapHeader from "../../components/common/layout/PathMapHeader";
import ContentCarousel from "../../components/common/layout/ContentCarousel";

// 실제 일러스트 에셋이 아직 없어서 데모용 회색 박스 placeholder 사용
const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect width='160' height='160' fill='%23eee'/%3E%3C/svg%3E";

const ADMIN_TABS = [
  { icon: "user", label: "입사자", path: "/admin/employee" },
  { icon: "wiki", label: "위키관리", path: "/admin/wiki" },
  { icon: "progress", label: "진행현황", path: "/admin/progress" },
  { icon: "bell", label: "HR확인", path: "/admin/hr" },
];

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

  return (
    <div style={{ padding: "24px" }}>
      <h2>공통 컴포넌트 목록</h2>

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
        <BaseCheckbox checked={checked} onChange={() => setChecked(!checked)} />
      </BaseCard>

      <BaseCard>
        <h3>AdminHeader</h3>
        <AdminHeader onLogout={() => alert("로그아웃")} />
      </BaseCard>

      <BaseCard>
        <h3>BottomTabNav</h3>
        <BottomTabNav tabs={ADMIN_TABS} active={activeTab} onChange={setActiveTab} />
      </BaseCard>

      <BaseCard>
        <h3>PathMapHeader</h3>
        <PathMapHeader title="오솔길" currentStep={4} totalStep={10} />
      </BaseCard>

      <BaseCard>
        <h3>ContentCarousel (핑거이야기 세트 — year)</h3>
        <ContentCarousel
          year="2010"
          title="씨앗"
          illustrationSrc={PLACEHOLDER_IMG}
          description="금융과 기술을 연결하기 위한 핑거의 첫걸음이 시작되었습니다."
        />
      </BaseCard>

      <BaseCard>
        <h3>ContentCarousel (법인카드 세트 — footnote)</h3>
        <ContentCarousel
          title="카드를 받았어요!"
          illustrationSrc={PLACEHOLDER_IMG}
          description="카드 뒷면에 서명(싸인)을 해주세요."
          footnote="아직 미수령 시 HR 담당자님께 문의해주세요"
        />
      </BaseCard>

      <BaseCard>
        <h3>ContentCarousel (포레스트 세트 — steps)</h3>
        <ContentCarousel
          title="매일 업무일지를 작성해요!"
          illustrationSrc={PLACEHOLDER_IMG}
          description="포레스트에서 업무일지를 작성하면 동료들과 공유할 수 있어요."
          steps={[
            { icon: "1", label: "작성" },
            { icon: "2", label: "제출" },
            { icon: "3", label: "승인" },
          ]}
        />
      </BaseCard>

      <BaseCard>
        <h3>ChatEntryButton</h3>
        <p className="muted">화면 우측 하단에 플로팅으로 떠있습니다.</p>
        <ChatEntryButton onClick={() => alert("챗봇 열기")} unreadCount={2} />
      </BaseCard>
    </div>
  );
}