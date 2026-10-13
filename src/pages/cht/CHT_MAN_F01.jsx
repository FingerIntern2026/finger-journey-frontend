// 역할: AI 챗봇 패널을 독립 화면으로 표시한다.
// 사용처: 화면 코드 CHT_MAN_F01
// 담당자: 김재웅

import ChatPanel from "../../components/common/layout/ChatPanel";
import useNavigationStore from "../../stores/useNavigationStore";

export default function CHT_MAN_F01() {
  const goBack = useNavigationStore((state) => state.goBack);

  return <ChatPanel embedded onClose={goBack} />;
}
