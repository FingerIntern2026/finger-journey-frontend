import EthicsRuleClear from "../../../components/feature/PTH/RTH/EthicsRuleClear";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_ETH_P05() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <EthicsRuleClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
