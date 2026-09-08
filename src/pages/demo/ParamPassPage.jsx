// ParamPassPage.jsx의 역할
// "파라미터 전달" 데모: 목록에서 항목을 클릭하면 그 항목의 값을
// 다음 페이지(ParamDetailPage)로 넘기면서 이동하는 걸 보여주는 화면
// hooks/useNavigation.js의 goTo(path, state)를 사용
// 실제 값 대신 데모용 임시 사원 데이터를 사용

import useNavigation from "../../hooks/useNavigation";

// 데모용 임시 데이터 (나중에 실제로는 API로 받아올 목록)
const dummyEmployees = [
  { employeeId: 1, name: "김핑거" },
  { employeeId: 2, name: "문핑거" },
  { employeeId: 3, name: "홍핑거" },
];

export default function ParamPassPage() {
  const { goTo } = useNavigation();

  // 항목 클릭 시 해당 employeeId를 들고 상세 페이지로 이동
  const handleClick = (employeeId) => {
    goTo("/demo/param-detail", { employeeId });
  };

  return (
    <div>
      <h2>파라미터 전달 데모</h2>
      <p>아래 목록에서 하나를 클릭하면, 해당 ID를 다음 페이지로 넘깁니다.</p>

      <ul>
        {dummyEmployees.map((employee) => (
          <li key={employee.employeeId}>
            <button onClick={() => handleClick(employee.employeeId)}>
              {employee.name} (ID: {employee.employeeId})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}