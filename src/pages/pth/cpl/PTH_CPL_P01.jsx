import CompletionInput from "../../../components/feature/PTH/CPL/CompletionInput";
import { COMPLETION_MOCK_NAME } from "../../../components/feature/PTH/CPL/completionMockData";
import useNavigation from "../../../hooks/useNavigation";
import useAuthStore from "../../../stores/authStore";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_CPL_P01() {
  const { goForward, goBack } = useNavigation();
  const params = useNavigationStore((state) => state.nowPageParams.params);
  const session = useAuthStore((state) => state.session);
  // 로그인한 사용자의 이름과 사번을 기준으로 한다. 세션이 없는 미리보기에서만 이동 값이나 예시 이름을 쓴다.
  const name = session?.name ?? params.employeeName ?? params.name ?? COMPLETION_MOCK_NAME;
  const employeeId = session?.employeeId ?? params.employeeId;

  const handleSuccess = (lines) => goForward("PTH_CPL_P02", { ...params, employeeId, employeeName: name, lines });

  return (
    <CompletionInput
      name={name}
      employeeId={employeeId}
      preview={!employeeId}
      onBack={goBack}
      onSuccess={handleSuccess}
    />
  );
}
