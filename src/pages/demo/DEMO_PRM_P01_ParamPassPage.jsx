// 페이지명: ParamPassPage (TODO: 정식 화면명 확정되면 교체)
// 역할: "파라미터 전달" 데모. 목록에서 항목을 클릭하면 그 항목의 값을 다음 페이지
//       (ParamDetailPage)로 넘기면서 이동하는 걸 보여주는 화면. hooks/useNavigation.js의
//       goToScreen(screenCode, state)를 사용하며, 실제 값 대신 데모용 임시 사원 데이터를 사용
// 사용처: MoveGuidePage에서 "파라미터전달" 버튼(goToScreen(SCREEN_CODES.DEMO_PARAM_PASS))으로 진입.
//         항목 클릭 시 ParamDetailPage로 employeeId를 넘기며 이동
// url: /demo/move/param
// 담당자:

import useNavigation from "../../hooks/useNavigation";
import { SCREEN_CODES } from "../../config/screenCodes";
import PageLayout from "../../components/common/layout/PageLayout.jsx";
import Header from "../../components/common/layout/Header.jsx";

// 데모용 임시 데이터 (나중에 실제로는 API로 받아올 목록)
const dummyEmployees = [
  { employeeId: 1, name: "김핑거" },
  { employeeId: 2, name: "문핑거" },
  { employeeId: 3, name: "홍핑거" },
];

export default function ParamPassPage() {
  const { goToScreen, goBack } = useNavigation();

  // 항목 클릭 시 해당 employeeId를 들고 상세 페이지로 이동
  const handleClick = (employeeId) => {
    goToScreen(SCREEN_CODES.DEMO_PARAM_DETAIL, { employeeId });
  };

  return (
    <PageLayout header={<Header label="파라미터 전달 데모" onBack={goBack} />}>
    <div style={{ padding: 24 }}>
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
    </PageLayout>
  );
}
