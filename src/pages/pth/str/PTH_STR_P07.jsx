import FingerStoryClear from "../../../components/feature/PTH/STR/FingerStoryClear";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_STR_P07() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <FingerStoryClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
