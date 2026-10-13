// 역할: 사번과 생년월일을 입력받아 프리보딩을 시작하는 인증 화면.
// 사용처: 화면 코드 PB_LGN_P01
// 담당자: 김재웅

import PreboardingLogin from "../../components/feature/PB/LGN/P01/PreboardingLogin";
import useNavigationStore from "../../stores/useNavigationStore";

/**
 * 프리보딩 첫 화면
 *
 * 인증 API가 연결되기 전까지는 CustomAuthForm의 빈 값·숫자 형식 검증 후
 * 입력값을 다음 화면의 params로 전달한다.
 */

export default function PB_LGN_P01() {
  const goForward = useNavigationStore((state) => state.goForward);

  return (
    <PreboardingLogin
      onSubmit={({ employeeNo, birthDate }) => goForward("PB_LGN_P02", { employeeNo, birthDate })}
    />
  );
}
