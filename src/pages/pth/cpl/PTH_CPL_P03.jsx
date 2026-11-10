import CompletionReport from "../../../components/feature/PTH/CPL/CompletionReport";
import { COMPLETION_MOCK_REPORT, createMockPoemLines } from "../../../components/feature/PTH/CPL/completionMockData";
import useNavigation from "../../../hooks/useNavigation";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_CPL_P03() {
  const { goForward, goBack } = useNavigation();
  const lines = useNavigationStore((state) => state.nowPageParams.params.lines);

  return (
    <CompletionReport
      report={COMPLETION_MOCK_REPORT}
      poemLines={createMockPoemLines(lines)}
      onBack={goBack}
      onWikiClick={() => goForward("WIK_INT_P01")}
    />
  );
}
