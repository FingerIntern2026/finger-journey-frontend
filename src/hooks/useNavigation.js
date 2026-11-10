// 역할: 화면 코드를 기준으로 다음 화면 이동과 뒤로가기를 처리한다.
// 사용처: pages, ScreenNavigationPanel.jsx
// 담당자: 김재웅

import { useNavigate } from "react-router-dom";
import { findScreenByCode } from "../services/screenService";
import useNavigationStore from "../stores/useNavigationStore";

export default function useNavigation() {
  const navigate = useNavigate();
  const nowPageParams = useNavigationStore((state) => state.nowPageParams);
  const historyStack = useNavigationStore((state) => state.historyStack);
  const setPendingBackParams = useNavigationStore((state) => state.setPendingBackParams);

  // clearHistory: true면 지나온 화면 목록을 비우고 이동한다.
  const goForward = (screenCode, params = {}, { clearHistory = false } = {}) => {
    const targetScreen = findScreenByCode(screenCode);

    if (!targetScreen) {
      return false;
    }

    const nowPage = { path: nowPageParams.path, params: nowPageParams.params };

    // 브라우저 기록 한 칸마다 그 시점의 목록을 함께 저장한다.
    navigate(targetScreen.routePath, {
      state: {
        params,
        historyStack: clearHistory ? [] : [...historyStack, nowPage],
      },
    });

    return true;
  };

  const goBack = (num = 1, preParams = {}) => {
    // 버튼 핸들러에 goBack을 직접 넘긴 경우 React의 클릭 이벤트가 첫 인자로 올 수 있다.
    // 이벤트 때문에 이전 화면 이동이 막히지 않도록 그런 경우에는 기본값(한 단계)을 사용한다.
    const step = Number.isInteger(num) ? num : 1;

    if (step < 1 || historyStack.length < step) {
      return false;
    }

    setPendingBackParams(preParams);
    navigate(-step);
    return true;
  };

  return { goForward, goBack };
}
