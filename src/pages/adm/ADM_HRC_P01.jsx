// 역할: 입사자를 선택해 HR 체크리스트 처리 현황을 관리하는 화면.
// 사용처: 화면 코드 ADM_HRC_P01
// 담당자: 김재웅

import AdminHrManagement from "../../components/feature/ADM/HRC/P01/AdminHrManagement";
import useNavigationStore from "../../stores/useNavigationStore";

export default function ADM_HRC_P01() {
  const goForward = useNavigationStore((state) => state.goForward);
  return <AdminHrManagement onNavigate={goForward} />;
}
