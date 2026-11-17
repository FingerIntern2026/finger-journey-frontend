import CompletionReport from "../../../components/feature/PTH/CPL/CompletionReport";
import useCompletionReport from "../../../components/feature/PTH/CPL/useCompletionReport";
import BaseButton from "../../../components/common/base/BaseButton";
import useNavigation from "../../../hooks/useNavigation";
import useAuthStore from "../../../stores/authStore";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_CPL_P03() {
  const { goForward, goBack } = useNavigation();
  const params = useNavigationStore((state) => state.nowPageParams.params);
  const employeeId = useAuthStore((state) => state.session?.employeeId) ?? params.employeeId;
  const { status, report, poemLines, errorMessage } = useCompletionReport(employeeId, params.lines);

  if (status === "loading") return <main role="status">AI가 리포트를 만들고 있어요. 잠시만 기다려주세요.</main>;

  if (status === "error") {
    return (
      <main role="alert">
        <p>{errorMessage}</p>
        <BaseButton label="뒤로 가기" onClick={goBack} />
      </main>
    );
  }

  return (
    <CompletionReport
      report={report}
      poemLines={poemLines}
      onBack={goBack}
      onWikiClick={() => goForward("WIK_INT_P01")}
    />
  );
}
