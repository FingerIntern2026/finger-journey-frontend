// 페이지명: ParamDetailPage (TODO: 정식 화면명 확정되면 교체)
// 역할: "파라미터 전달" 데모의 받는 쪽 화면. ParamPassPage.jsx에서 goToScreen(screenCode, { employeeId })로
//       넘긴 값을 useLocation()의 state로 받아서 화면에 표시. 값이 없을 경우(직접 주소로
//       들어온 경우)도 대비해서 안내 문구 처리
// 사용처: ParamPassPage에서 목록 항목 클릭 시 SCREEN_CODES.DEMO_PARAM_DETAIL로 진입
// url: /demo/param-detail
// 담당자:

import { useLocation } from "react-router-dom";
import useNavigation from "../../hooks/useNavigation";
import PageLayout from "../../components/common/layout/PageLayout.jsx";
import Header from "../../components/common/layout/Header.jsx";

export default function ParamDetailPage() {
  const location = useLocation();
  const { goBack } = useNavigation();

  // ParamPassPage에서 넘겨준 값 꺼내기
  const employeeId = location.state?.employeeId;

  return (
    <PageLayout header={<Header label="파라미터 전달 데모 (상세)" onBack={goBack} />}>
    <div style={{ padding: 24 }}>
      {employeeId ? (
        <p>이전 화면에서 넘어온 사원 ID: {employeeId}</p>
      ) : (
        <p>전달받은 값이 없습니다. 목록 화면에서 항목을 클릭해서 들어와주세요.</p>
      )}
    </div>
    </PageLayout>
  );
}
