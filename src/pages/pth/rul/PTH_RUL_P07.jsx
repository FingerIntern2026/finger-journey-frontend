import EmploymentRuleClear from "../../../components/feature/PTH/RUL/EmploymentRuleClear";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_RUL_P07() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <EmploymentRuleClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
