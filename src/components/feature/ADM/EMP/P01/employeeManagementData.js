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

// 서버에 기존 사원 목록 API가 없어서 아직 화면용 예시 데이터를 쓴다.
export const EXISTING_EMPLOYEES = [
  { id: 1, name: "김핑거1", employeeNo: "FG20191000", department: "Common Tech", position: "사원", joinDate: "2019-01-01", status: "재직" },
  { id: 2, name: "이핑거2", employeeNo: "FG20201001", department: "Platform Part", position: "선임", joinDate: "2020-02-02", status: "재직" },
  { id: 3, name: "박핑거3", employeeNo: "FG20211102", department: "HR팀", position: "책임", joinDate: "2021-03-03", status: "휴직" },
  { id: 4, name: "최핑거4", employeeNo: "FG20221103", department: "Develop 1팀", position: "수석", joinDate: "2022-04-04", status: "재직" },
  { id: 5, name: "정핑거5", employeeNo: "FG20231104", department: "Develop 2팀", position: "팀장", joinDate: "2023-05-05", status: "재직" },
];
