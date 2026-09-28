// 역할: 페이지 이동(다른 주소로 가기 / 값 넘기기 / 뒤로가기)을 한 곳에서 관리하는 커스텀 훅.
//       React Router의 useNavigate를 직접 페이지마다 쓰지 않고 이 훅을 통해서만 사용.
//       historyStack 연동: goToScreen/goBack이 실제 이동과 함께 이동 기록도 같이 쌓고/지움
//       (navigate(-1)은 브라우저 히스토리만 다루고 우리가 넘긴 파라미터는 기억 못 하기 때문)
// 사용처: DemoIndexPage.jsx, ReportExamplePage.jsx, ReportResultPage.jsx, GoBackExamplePage.jsx,
//         ParamPassPage.jsx, ParamDetailPage.jsx
// 담당자:

import { useLocation, useNavigate } from "react-router-dom";
import { push, pop, peek, clear } from "../utils/historyStack";
import { SCREEN_CODES } from "../config/screenCodes";
import { findScreenByCode, findScreenByPath, getRoutePath } from "../utils/screenConfig";
import { addStep, safeSerialize } from "../devtrace/traceContext";
import { findRouteKnowledge } from "../devtrace/knowledge";

export default function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // 화면 코드로 routePath를 조회한 뒤 이동한다. 페이지는 URL을 직접 알 필요가 없다.
  const goToScreen = (screenCode, state) => {
    const path = getRoutePath(screenCode);
    // 메인 화면으로 가는 거면 지금까지 쌓인 이동 기록은 더 이상 의미가 없으므로 초기화
    if (screenCode === SCREEN_CODES.DEMO_HOME) {
      clear();
      addStep({ layer: "nav", label: "historyStack.clear()", source: "src/utils/historyStack.js" });
    } else {
      // prevParams: 지금 쌓기 직전까지 맨 위에 있던 기록의 params (= 방금 있던 화면이 들고 있던 값)
      const prevParams = peek()?.params;
      push({ path, params: state, prevParams });
      addStep({
        layer: "nav",
        label: "historyStack.push()",
        source: "src/utils/historyStack.js",
        output: safeSerialize({ path, params: state }),
      });
    }
    addStep({
      layer: "nav",
      label: `goToScreen(${screenCode})`,
      source: "src/hooks/useNavigation.js",
      note: findRouteKnowledge(path),
    });
    navigate(path, { state });
  };

  // 현재 화면의 DB 뒤로가기 규칙에 따라 대상 화면 코드와 routePath를 결정한다.
  const goBack = () => {
    const currentScreen = findScreenByPath(location.pathname);

    if (!currentScreen) {
      throw new Error(`현재 경로에 해당하는 화면정보가 없습니다: ${location.pathname}`);
    }

    if (currentScreen.backAction === "BLOCK") {
      addStep({
        layer: "nav",
        label: `goBack(${currentScreen.screenCode}) 차단`,
        source: "src/hooks/useNavigation.js",
        note: "화면정보의 backAction이 BLOCK이므로 이동하지 않음",
      });
      return;
    }

    const targetCode = currentScreen.backAction === "TARGET"
      ? currentScreen.backScreenCode
      : currentScreen.exitScreenCode;
    const targetScreen = findScreenByCode(targetCode);

    if (!targetScreen) {
      throw new Error(`뒤로가기 대상 화면정보가 없습니다: ${targetCode}`);
    }

    const popped = pop();
    if (targetCode === SCREEN_CODES.DEMO_HOME) {
      clear();
    }

    addStep({
      layer: "nav",
      label: "historyStack.pop()",
      source: "src/utils/historyStack.js",
      output: safeSerialize(popped),
    });
    addStep({
      layer: "nav",
      label: `goBack(${currentScreen.screenCode} → ${targetCode})`,
      source: "src/hooks/useNavigation.js",
      note: `${currentScreen.backAction} 규칙으로 ${targetScreen.routePath} 이동`,
    });
    navigate(targetScreen.routePath, { replace: true, state: popped?.prevParams });
  };

  return { goToScreen, goBack };
}
