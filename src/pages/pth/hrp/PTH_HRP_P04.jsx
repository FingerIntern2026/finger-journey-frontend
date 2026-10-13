import HrPolicyClear from "../../../components/feature/PTH/HRP/HrPolicyClear";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_HRP_P04() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <HrPolicyClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
