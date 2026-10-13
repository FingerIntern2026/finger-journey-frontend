// 역할: 입사 축하 카드와 첫 출근 안내를 제공하는 프리보딩 완료 화면.
// 사용처: 화면 코드 PB_LGN_P02
// 담당자: 김재웅

import PreboardingWelcome from "../../components/feature/PB/LGN/P02/PreboardingWelcome";
import useNavigationStore from "../../stores/useNavigationStore";

export default function PB_LGN_P02() {
  const goForward = useNavigationStore((state) => state.goForward);
  return <PreboardingWelcome onStartCheckin={() => goForward("CHK_INT_P01")} />;
}
