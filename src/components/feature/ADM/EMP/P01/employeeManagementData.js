// 입사자 등록·수정 폼의 입력칸. 조직·직급은 서버 목록으로 선택지를 채운다.
// 수정할 때는 사번을 바꿀 수 없고(서버 수정 API가 사번을 받지 않음), 생년월일은 비워두면 그대로 유지된다.
export const buildEmployeeFormFields = ({ isEdit, organizations, positions }) => [
  { name: "employeeNo", label: "사번", placeholder: "12608002", required: true, disabled: isEdit },
  { name: "name", label: "이름", placeholder: "박핑거", required: true },
  {
    name: "organizationId",
    label: "부서/팀",
    type: "select",
    required: true,
    options: organizations.map((item) => ({ value: String(item.organizationId), label: item.organizationName })),
  },
  {
    name: "positionId",
    label: "직급",
    type: "select",
    required: true,
    options: positions.map((item) => ({ value: String(item.positionId), label: item.positionName })),
  },
  { name: "hireDate", label: "입사일", type: "date", required: true },
  { name: "birthDate", label: isEdit ? "생년월일 (바꿀 때만 입력)" : "생년월일", type: "date", required: !isEdit },
];
