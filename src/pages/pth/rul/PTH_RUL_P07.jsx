import EmploymentRuleClear from "../../../components/feature/PTH/RUL/EmploymentRuleClear";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_RUL_P07() {
  const { goForward, goBack } = useNavigation();
  return <EmploymentRuleClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
