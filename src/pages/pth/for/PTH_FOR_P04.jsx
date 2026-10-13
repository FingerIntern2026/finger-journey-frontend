import ForestPage from "../../../components/feature/PTH/FOR/ForestPage";
import useNavigationStore from "../../../stores/useNavigationStore";
export default function PTH_FOR_P04() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <ForestPage step={4} onBack={goBack} onNext={() => goForward("PTH_FOR_P05")} />;
}
