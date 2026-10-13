import ForestClear from "../../../components/feature/PTH/FOR/ForestClear";
import useNavigationStore from "../../../stores/useNavigationStore";
export default function PTH_FOR_P07() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <ForestClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
