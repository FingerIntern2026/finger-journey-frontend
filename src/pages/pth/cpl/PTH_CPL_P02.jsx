import CompletionSaved from "../../../components/feature/PTH/CPL/CompletionSaved";
import { COMPLETION_MOCK_LINES, COMPLETION_MOCK_NAME } from "../../../components/feature/PTH/CPL/completionMockData";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_CPL_P02() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  const params = useNavigationStore((state) => state.nowPageParams.params);
  const name = params.employeeName ?? params.name ?? COMPLETION_MOCK_NAME;
  const lines = params.lines ?? COMPLETION_MOCK_LINES;

  return <CompletionSaved name={name} lines={lines} onBack={goBack} onNext={() => goForward("PTH_CPL_P03", params)} />;
}
