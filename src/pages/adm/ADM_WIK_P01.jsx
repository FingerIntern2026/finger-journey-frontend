// 역할: 위키 카테고리와 하위 항목을 등록·수정·삭제하는 관리자 화면.
// 사용처: 화면 코드 ADM_WIK_P01
// 담당자: 김재웅

import AdminWikiManagement from "../../components/feature/ADM/WIK/P01/AdminWikiManagement";
import useNavigationStore from "../../stores/useNavigationStore";

export default function ADM_WIK_P01() {
  const goForward = useNavigationStore((state) => state.goForward);

  return <AdminWikiManagement onNavigate={goForward} />;
}
