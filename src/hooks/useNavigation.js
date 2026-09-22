// 역할: 페이지 이동(다른 주소로 가기 / 값 넘기기 / 뒤로가기)을 한 곳에서 관리하는 커스텀 훅.
//       React Router의 useNavigate를 직접 페이지마다 쓰지 않고 이 훅을 통해서만 사용.
//       historyStack 연동: goTo/goBack이 실제 이동과 함께 이동 기록도 같이 쌓고/지움
//       (navigate(-1)은 브라우저 히스토리만 다루고 우리가 넘긴 파라미터는 기억 못 하기 때문)
// 사용처: DemoIndexPage.jsx, ReportExamplePage.jsx, ReportResultPage.jsx, GoBackExamplePage.jsx,
//         ParamPassPage.jsx, ParamDetailPage.jsx
// 담당자:

import { useNavigate } from "react-router-dom";
import { push, pop, peek, clear } from "../utils/historyStack";
import { ROUTE_PATHS } from "../config/routeConfig";

export default function useNavigation() {
  const navigate = useNavigate();

  // 특정 경로로 이동 (필요하면 값을 함께 넘김)
  const goTo = (path, state) => {
    // 메인 화면으로 가는 거면 지금까지 쌓인 이동 기록은 더 이상 의미가 없으므로 초기화
    if (path === ROUTE_PATHS.DEMO_HOME) {
      clear();
    } else {
      // prevParams: 지금 쌓기 직전까지 맨 위에 있던 기록의 params (= 방금 있던 화면이 들고 있던 값)
      const prevParams = peek()?.params;
      push({ path, params: state, prevParams });
    }
    navigate(path, { state });
  };

  // 이전 페이지로 돌아가기
  const goBack = () => {
    pop();
    navigate(-1);
  };

  return { goTo, goBack };
}