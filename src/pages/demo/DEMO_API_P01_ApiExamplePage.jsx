// 페이지명: ApiExamplePage (TODO: 정식 화면명 확정되면 교체)
// 역할: api/client.js의 sendPost를 사용해 실제 서버 API를 호출해보는 데모 화면. API 명세서
//       기준 사원(입사자) CRUD 5개(API-ADM-001~005: 목록조회/상세조회/등록/수정/삭제, 전부 POST)를
//       각각 버튼으로 테스트하고, 호출 결과는 화면 하단에 그대로 찍어서 눈으로 확인
// 사용처: DemoIndexPage에서 "④ API통신" 버튼(SCREEN_CODES.DEMO_API)으로 진입
// url: /demo/api
// 담당자:

import { useState } from "react";
import { sendPost } from "../../api/client";
import BaseButton from "../../components/common/base/BaseButton";
import BaseInput from "../../components/common/base/BaseInput";
import BaseCard from "../../components/common/base/BaseCard";
import PageLayout from "../../components/common/layout/PageLayout.jsx";
import Header from "../../components/common/layout/Header.jsx";
import useNavigation from "../../hooks/useNavigation";

export default function ApiExamplePage() {
  const { goBack } = useNavigation();
  // API 호출 결과를 화면에 찍어보기 위한 state
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // 등록/수정/삭제/상세조회에 쓸 입력값들
  const [employeeId, setEmployeeId] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [positionId, setPositionId] = useState("");
  const [hireDate, setHireDate] = useState("");

  // 모든 호출을 감싸는 공통 처리: 성공하면 result에, 실패하면 error에 담기
  const callApi = async (apiFn) => {
    setError(null);
    setResult(null);
    try {
      const data = await apiFn();
      setResult(data);
    } catch (err) {
      setError(err.response?.data ?? err.message);
    }
  };

  // API-ADM-001: 사원 목록 조회
  const handleGetList = () => {
    callApi(() => sendPost("/admin/employee/list", {}));
  };

  // API-ADM-002: 사원 상세 조회
  const handleGetDetail = () => {
    callApi(() => sendPost("/admin/employee/detail", { employeeId: Number(employeeId) }));
  };

  // API-ADM-003: 사원 등록
  const handleCreate = () => {
    callApi(() =>
      sendPost("/admin/employee/create", {
        employeeNo,
        name,
        organizationId: Number(organizationId),
        positionId: Number(positionId),
        hireDate,
      })
    );
  };

  // API-ADM-004: 사원 수정
  const handleUpdate = () => {
    callApi(() =>
      sendPost("/admin/employee/update", {
        employeeId: Number(employeeId),
        name,
        organizationId: organizationId ? Number(organizationId) : undefined,
        positionId: positionId ? Number(positionId) : undefined,
        hireDate: hireDate || undefined,
      })
    );
  };

  // API-ADM-005: 사원 삭제
  const handleDelete = () => {
    callApi(() => sendPost("/admin/employee/delete", { employeeId: Number(employeeId) }));
  };

  return (
    <PageLayout header={<Header label="API 통신 데모" onBack={goBack} />}>
    <div style={{ padding: "24px" }}>
      <BaseCard>
        <h3>공통 입력값</h3>
        <BaseInput label="사원 ID (상세/수정/삭제용)" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
        <BaseInput label="사번" value={employeeNo} onChange={(e) => setEmployeeNo(e.target.value)} />
        <BaseInput label="이름" value={name} onChange={(e) => setName(e.target.value)} />
        <BaseInput label="조직 ID" value={organizationId} onChange={(e) => setOrganizationId(e.target.value)} />
        <BaseInput label="직급 ID" value={positionId} onChange={(e) => setPositionId(e.target.value)} />
        <BaseInput label="입사일 (YYYY-MM-DD)" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
      </BaseCard>

      <BaseCard>
        <h3>API 호출</h3>
        <BaseButton label="사원 목록 조회" onClick={handleGetList} />
        <BaseButton label="사원 상세 조회" onClick={handleGetDetail} />
        <BaseButton label="사원 등록" onClick={handleCreate} />
        <BaseButton label="사원 수정" onClick={handleUpdate} />
        <BaseButton label="사원 삭제" variant="danger" onClick={handleDelete} />
      </BaseCard>

      <BaseCard>
        <h3>결과</h3>
        {error && (
          <pre style={{ color: "red" }}>{JSON.stringify(error, null, 2)}</pre>
        )}
        {result && (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        )}
        {!error && !result && <p style={{ color: "gray" }}>버튼을 눌러 결과를 확인하세요.</p>}
      </BaseCard>
    </div>
    </PageLayout>
  );
}
