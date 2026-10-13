import HrPolicyPage from "../../../components/feature/PTH/HRP/HrPolicyPage";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_HRP_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <HrPolicyPage step={1} onBack={goBack} onNext={() => goForward("PTH_HRP_P02")} />;
}
