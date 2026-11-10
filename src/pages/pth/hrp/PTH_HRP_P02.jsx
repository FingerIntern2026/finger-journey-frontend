import HrPolicyPage from "../../../components/feature/PTH/HRP/HrPolicyPage";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_HRP_P02() {
  const { goForward, goBack } = useNavigation();
  return <HrPolicyPage step={2} onBack={goBack} onNext={() => goForward("PTH_HRP_P03")} />;
}
