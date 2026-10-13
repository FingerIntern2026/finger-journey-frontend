// 역할: 핑거 위키의 목적을 소개하고 목록 화면으로 이동시키는 인트로 화면.
// 사용처: 화면 코드 WIK_INT_P01
// 담당자: 김재웅

import WikiIntro from "../../components/feature/WIK/INT/P01/WikiIntro";
import useNavigationStore from "../../stores/useNavigationStore";

export default function WIK_INT_P01() {
  const goForward = useNavigationStore((state) => state.goForward);
  return (
    <WikiIntro
      onOpenAdmin={() => goForward("ADM_EMP_P01")}
      onExplore={() => goForward("WIK_LIS_P01")}
    />
  );
}
