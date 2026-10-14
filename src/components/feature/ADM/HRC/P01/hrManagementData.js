// 완주 3행시는 employeeId를 기준으로 저장되므로, 탭에서도 이름과 ID를 함께 관리한다.
// 백엔드 data.sql의 발표용 사원 데이터와 동일한 값이다.
export const EMPLOYEES = [
  { id: 1, name: "김신입" },
  { id: 2, name: "이신입" },
  { id: 4, name: "최준비" },
];

export const INITIAL_CHECKLIST = [
  { id: "documents", label: "서류 제출", checked: true },
  { id: "equipment", label: "업무 장비 확인", checked: false },
  { id: "account", label: "계정 발급 확인", checked: false },
  { id: "contract", label: "계약서 작성", checked: false },
  { id: "seat", label: "좌석 배정 확인", checked: false },
];
