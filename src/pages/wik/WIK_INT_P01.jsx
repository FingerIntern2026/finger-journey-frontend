// 역할: 핑거 위키의 목적을 소개하고 목록 화면으로 이동시키는 인트로 화면.
// 사용처: 화면 코드 WIK_INT_P01
// 담당자: 김재웅

import WikiIntro from "../../components/feature/WIK/INT/P01/WikiIntro";
import useNavigation from "../../hooks/useNavigation";
import useAuthStore from "../../stores/authStore";

export default function WIK_INT_P01() {
  const { goForward } = useNavigation();
  // 관리자 권한(adminRole)이 있는 사용자에게만 관리자 페이지 이동 버튼을 보여준다.
  const canOpenAdmin = useAuthStore((state) => Boolean(state.session?.adminRole));

  return (
    <WikiIntro
      canOpenAdmin={canOpenAdmin}
      onOpenAdmin={() => goForward("ADM_EMP_P01")}
      onExplore={() => goForward("WIK_LIS_P01")}
    />
  );
}
