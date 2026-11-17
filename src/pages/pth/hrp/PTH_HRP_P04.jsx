import HrPolicyClear from "../../../components/feature/PTH/HRP/HrPolicyClear";
import useNavigation from "../../../hooks/useNavigation";
import useStageClear from "../../../hooks/useStageClear";

export default function PTH_HRP_P04() {
  const { goBack } = useNavigation();
  const clearStage = useStageClear(3);
  return <HrPolicyClear onBack={goBack} onComplete={clearStage} />;
}
