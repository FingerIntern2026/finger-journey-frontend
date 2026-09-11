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
        <h3>ChatEntryButton</h3>
        <p className="muted">화면 우측 하단에 플로팅으로 떠있습니다.</p>
        <ChatEntryButton onClick={() => alert("챗봇 열기")} unreadCount={2} />
      </BaseCard>
    </div>
  );
}