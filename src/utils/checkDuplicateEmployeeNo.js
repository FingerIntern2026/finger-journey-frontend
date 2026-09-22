// 역할: 관리자가 입사자를 등록할 때(ADM_EMP_P02), 입력한 사번이 이미 등록된 사번인지 확인하는
//       순수 함수 (인터페이스 명세서 4.6.4 DuplicateIdValidator). EmployeeForm의 onSave 내부에서
//       저장 요청 보내기 전에 먼저 이 함수로 걸러내는 용도
// 사용처: 현재 사용하는 곳 없음
// 담당자:

// employeeNo   : 사용자가 입력창에 방금 입력한 사번
// existingList : 이미 등록된 사원 목록. [{ employeeNo: '...' }, ...] 형태
//                (EmployeeListResponse를 그대로 넘기면 됨)
// 반환값 : true면 이미 등록된 사번(중복), false면 사용 가능
export function checkDuplicateEmployeeNo(employeeNo, existingList) {
    if (!employeeNo) return false;

    const target = employeeNo.trim();
    return existingList.some((employee) => employee.employeeNo === target);
}
