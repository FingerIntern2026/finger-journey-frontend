export const ONBOARDING_EMPLOYEES = [
  { id: 1, name: "김핑거", employeeNo: "FG2024001", department: "Common Tech Part", position: "인턴", joinDate: "2026-08-01", progress: 70 },
  { id: 2, name: "이핑거", employeeNo: "FG2024002", department: "Common Tech Part", position: "인턴", joinDate: "2026-08-01", progress: 40 },
  { id: 3, name: "박핑거", employeeNo: "FG2024003", department: "Common Tech Part", position: "인턴", joinDate: "2026-08-01", progress: 70 },
];

export const EXISTING_EMPLOYEES = [
  { id: 1, name: "김핑거1", employeeNo: "FG20191000", department: "Common Tech", position: "사원", joinDate: "2019-01-01", status: "재직" },
  { id: 2, name: "이핑거2", employeeNo: "FG20201001", department: "Platform Part", position: "선임", joinDate: "2020-02-02", status: "재직" },
  { id: 3, name: "박핑거3", employeeNo: "FG20211102", department: "HR팀", position: "책임", joinDate: "2021-03-03", status: "휴직" },
  { id: 4, name: "최핑거4", employeeNo: "FG20221103", department: "Develop 1팀", position: "수석", joinDate: "2022-04-04", status: "재직" },
  { id: 5, name: "정핑거5", employeeNo: "FG20231104", department: "Develop 2팀", position: "팀장", joinDate: "2023-05-05", status: "재직" },
];

export const EMPLOYEE_FORM_FIELDS = [
  { name: "employeeNo", label: "사번", placeholder: "12608002", required: true },
  { name: "name", label: "이름", placeholder: "박핑거", required: true },
  { name: "department", label: "부서/팀", placeholder: "Platform 1본부 개발 1팀", required: true },
  { name: "position", label: "직급", placeholder: "인턴", required: true },
  { name: "joinDate", label: "입사일", placeholder: "2026-08-01", required: true },
];
