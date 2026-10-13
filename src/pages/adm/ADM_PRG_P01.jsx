// 역할: 입사자별 온보딩 진행 현황을 조회하는 관리자 화면.
// 사용처: 화면 코드 ADM_PRG_P01
// 담당자: 김재웅

import AdminProgress from "../../components/feature/ADM/PRG/P01/AdminProgress";
import useNavigationStore from "../../stores/useNavigationStore";

export default function ADM_PRG_P01() {
  const goForward = useNavigationStore((state) => state.goForward);

  return <AdminProgress onNavigate={goForward} />;
}
