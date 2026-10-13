import EmploymentRulePage from "../../../components/feature/PTH/RUL/EmploymentRulePage";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_RUL_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <EmploymentRulePage step={1} onBack={goBack} onNext={() => goForward("PTH_RUL_P02")} />;
}
