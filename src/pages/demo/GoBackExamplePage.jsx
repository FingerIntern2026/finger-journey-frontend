// 페이지명: GoBackExamplePage (TODO: 정식 화면명 확정되면 교체)
// 역할: "뒤로가기" 데모 화면. useNavigation.js의 goBack()으로 이전 페이지로 이동하고,
//       히스토리가 없을 때는 goTo()로 대체 이동 처리. 페이지 이동은 반드시 이 훅을 통해서만
//       수행함 (React Router 원본 함수 직접 사용 금지)
// 사용처: MoveGuidePage에서 "뒤로가기" 버튼(navigate(ROUTE_PATHS.DEMO_MOVE_GO_BACK))으로 진입
// url: /demo/move/go-back
// 담당자:

import useNavigation from "../../hooks/useNavigation";
import { ROUTE_PATHS } from "../../config/routeConfig";

export default function GoBackExamplePage() {
  const { goBack, goTo } = useNavigation();

  return (
    <div>
      <h2>뒤로가기 데모</h2>
      <p>
        아래 버튼을 누르면 이 화면으로 들어오기 직전 페이지로 돌아갑니다.
      </p>

      <button onClick={goBack}>뒤로가기</button>

      <p style={{ marginTop: "12px", color: "gray" }}>
        (만약 이 페이지에 직접 들어와서 뒤로 갈 곳이 없다면, 아래 버튼으로
        데모 목록으로 이동하세요.)
      </p>
      <button onClick={() => goTo(ROUTE_PATHS.DEMO_HOME)}>데모 목록으로</button>
    </div>
  );
}