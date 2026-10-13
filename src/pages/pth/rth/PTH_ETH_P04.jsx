import EthicsRulePage from "../../../components/feature/PTH/RTH/EthicsRulePage";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_ETH_P04() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <EthicsRulePage step={4} onBack={goBack} onNext={() => goForward("PTH_ETH_P05")} />;
}
