import HrPolicyPage from "../../../components/feature/PTH/HRP/HrPolicyPage";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_HRP_P01() {
  const { goForward, goBack } = useNavigation();
  return <HrPolicyPage step={1} onBack={goBack} onNext={() => goForward("PTH_HRP_P02")} />;
}
