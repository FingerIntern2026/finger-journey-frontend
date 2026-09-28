// 역할: 페이지 이동(다른 주소로 가기 / 값 넘기기 / 뒤로가기)을 한 곳에서 관리하는 커스텀 훅.
//       React Router의 useNavigate를 직접 페이지마다 쓰지 않고 이 훅을 통해서만 사용.
//       historyStack 연동: goToScreen/goBack이 실제 이동과 함께 이동 기록도 같이 쌓고/지움
//       (navigate(-1)은 브라우저 히스토리만 다루고 우리가 넘긴 파라미터는 기억 못 하기 때문)
// 사용처: DemoIndexPage.jsx, ReportExamplePage.jsx, ReportResultPage.jsx, GoBackExamplePage.jsx,
//         ParamPassPage.jsx, ParamDetailPage.jsx
// 담당자:

import { useLocation, useNavigate } from "react-router-dom";
import { push, pop, popN, peek, clear } from "../utils/historyStack";
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

  // 화면정보 규칙과 무관하게, 히스토리 기록을 한 번에 N칸 되돌린다.
  // goBack()(TARGET/EXIT/BLOCK 규칙 기반)과는 별개의 기능 — 여러 단계를 한 번에 건너뛸 때 사용.
  //
  // goBack()을 N번 반복 호출하는 것과 다르다: location은 useLocation() 렌더 스냅샷이라
  // 같은 이벤트 핸들러 안에서 goBack()을 연달아 부르면 location이 안 바뀐 채로 여러 번
  // 실행돼 의도대로 동작하지 않음.
  //
  // navigate(-count)(브라우저 히스토리를 실제로 거슬러 올라가는 방식)는 쓰지 않는다.
  // goBack()이 replace: true(칸을 덮어씀)로 이동하는 것과 방식이 달라서, 둘을 섞어 쓰면
  // historyStack(우리 장부)과 브라우저 히스토리 칸 수가 어긋날 수 있기 때문
  // (예: C에서 goBack()으로 B로 가면 브라우저는 칸이 안 줄고 덮어써지는데, historyStack은
  // 실제로 1개 줄어듦 — 이 상태에서 navigate(-count)로 더 이동하면 두 장부가 안 맞게 됨).
  // 그래서 goBack()과 똑같이 historyStack만 보고 replace로 이동해 항상 같은 방식으로 맞춘다.
  const goBackN = (count) => {
    popN(count);
    const remaining = peek();

    addStep({
      layer: "nav",
      label: "historyStack.popN()",
      source: "src/utils/historyStack.js",
      output: safeSerialize({ count, remaining }),
    });

    if (!remaining) {
      // 장부에 남은 기록이 없으면(N이 쌓인 기록보다 크거나 같으면) 홈으로 보낸다
      clear();
      addStep({
        layer: "nav",
        label: `goBackN(${count}) → 홈`,
        source: "src/hooks/useNavigation.js",
        note: "historyStack에 남은 기록이 없어 홈으로 이동",
      });
      navigate(getRoutePath(SCREEN_CODES.DEMO_HOME), { replace: true });
      return;
    }

    addStep({
      layer: "nav",
      label: `goBackN(${count}) → ${remaining.path}`,
      source: "src/hooks/useNavigation.js",
      note: "historyStack에 남은 마지막 기록으로 이동",
    });
    navigate(remaining.path, { replace: true, state: remaining.params });
  };

  return { goToScreen, goBack, goBackN };
}
