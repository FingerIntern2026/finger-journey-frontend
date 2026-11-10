// 역할: 입사 예정 사원과 기존 사원을 통합 관리하는 관리자 메인 화면.
// 사용처: 화면 코드 ADM_EMP_P01
// 담당자: 김재웅

import AdminEmployeeManagement from "../../components/feature/ADM/EMP/P01/AdminEmployeeManagement";
import useNavigation from "../../hooks/useNavigation";

export default function ADM_EMP_P01() {
  const { goForward } = useNavigation();

  return <AdminEmployeeManagement onNavigate={goForward} />;
}
