import EmploymentRulePage from "../../../components/feature/PTH/RUL/EmploymentRulePage";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_RUL_P06() {
  const { goForward, goBack } = useNavigation();
  return <EmploymentRulePage step={6} onBack={goBack} onNext={() => goForward("PTH_RUL_P07")} />;
}
