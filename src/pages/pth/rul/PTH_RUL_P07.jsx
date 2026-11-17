import EmploymentRuleClear from "../../../components/feature/PTH/RUL/EmploymentRuleClear";
import useNavigation from "../../../hooks/useNavigation";
import useStageClear from "../../../hooks/useStageClear";

export default function PTH_RUL_P07() {
  const { goBack } = useNavigation();
  const clearStage = useStageClear(2);
  return <EmploymentRuleClear onBack={goBack} onComplete={clearStage} />;
}
