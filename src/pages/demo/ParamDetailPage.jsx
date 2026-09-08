// ParamDetailPage.jsx의 역할
// "파라미터 전달" 데모의 받는 쪽 화면
// ParamPassPage.jsx에서 goTo(path, { employeeId })로 넘긴 값을
// useLocation()의 state로 받아서 화면에 표시
// 값이 없을 경우(직접 주소로 들어온 경우)도 대비해서 안내 문구 처리

import { useLocation } from "react-router-dom";
import useNavigation from "../../hooks/useNavigation";

export default function ParamDetailPage() {
  const location = useLocation();
  const { goBack } = useNavigation();

  // ParamPassPage에서 넘겨준 값 꺼내기
  const employeeId = location.state?.employeeId;

  return (
    <div>
      <h2>파라미터 전달 데모 (상세)</h2>

      {employeeId ? (
        <p>이전 화면에서 넘어온 사원 ID: {employeeId}</p>
      ) : (
        <p>전달받은 값이 없습니다. 목록 화면에서 항목을 클릭해서 들어와주세요.</p>
      )}

      <button onClick={goBack}>뒤로가기</button>
    </div>
  );
}