import HrPolicyClear from "../../../components/feature/PTH/HRP/HrPolicyClear";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_HRP_P04() {
  const { goForward, goBack } = useNavigation();
  return <HrPolicyClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
