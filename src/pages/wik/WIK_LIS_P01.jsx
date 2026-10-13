// 역할: 핑거 위키 카테고리와 검색 결과를 탐색하는 목록 화면.
// 사용처: 화면 코드 WIK_LIS_P01
// 담당자: 김재웅

import WikiList from "../../components/feature/WIK/LIS/P01/WikiList";
import useNavigationStore from "../../stores/useNavigationStore";

export default function WIK_LIS_P01() {
  const goForward = useNavigationStore((state) => state.goForward);
  return <WikiList onCreateReport={() => goForward("PTH_MAP_P01")} />;
}
