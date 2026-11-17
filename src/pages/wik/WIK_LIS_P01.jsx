// 역할: 핑거 위키 카테고리와 검색 결과를 탐색하는 목록 화면.
//       AI 리포트가 이미 있으면 오른쪽 위 "AI 리포트"로 내 리포트를 보고, 없으면 아래 버튼으로 퀴즈를 풀러 간다.
// 사용처: 화면 코드 WIK_LIS_P01
// 담당자: 김재웅

import WikiList from "../../components/feature/WIK/LIS/P01/WikiList";
import useMyReport from "../../components/feature/WIK/LIS/P01/useMyReport";
import useNavigation from "../../hooks/useNavigation";

export default function WIK_LIS_P01() {
  const { goForward } = useNavigation();
  const reportStatus = useMyReport();

  return (
    <WikiList
      reportStatus={reportStatus}
      // 리포트가 있으면 내 리포트, 없으면 리포트를 만들 수 있게 오솔길로 보낸다.
      onOpenReport={() => goForward(reportStatus === "exists" ? "PTH_CPL_P03" : "PTH_MAP_P01")}
      onCreateReport={() => goForward("PTH_MAP_P01")}
    />
  );
}
