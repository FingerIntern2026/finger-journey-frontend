import ReportResultPage from "../../demo/DEMO_RPT_P02_ReportResultPage";
import { COMPLETION_MOCK_REPORT, createMockPoemLines } from "../../../components/feature/PTH/CPL/completionMockData";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_CPL_P03() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  const lines = useNavigationStore((state) => state.nowPageParams.params.lines);

  return (
    <ReportResultPage
      initialReport={COMPLETION_MOCK_REPORT}
      initialPoemLines={createMockPoemLines(lines)}
      onBack={goBack}
      onWikiClick={() => goForward("WIK_INT_P01")}
      pthMode
    />
  );
}
