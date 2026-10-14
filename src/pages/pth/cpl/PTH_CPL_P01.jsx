import CompletionInput from "../../../components/feature/PTH/CPL/CompletionInput";
import { COMPLETION_MOCK_NAME } from "../../../components/feature/PTH/CPL/completionMockData";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_CPL_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  const params = useNavigationStore((state) => state.nowPageParams.params);
  const name = params.employeeName ?? params.name ?? COMPLETION_MOCK_NAME;
  const employeeId = params.employeeId;

  const handleSuccess = (lines) => goForward("PTH_CPL_P02", { ...params, employeeName: name, lines });

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
