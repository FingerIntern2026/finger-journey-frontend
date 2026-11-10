import EthicsRuleClear from "../../../components/feature/PTH/RTH/EthicsRuleClear";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_ETH_P05() {
  const { goForward, goBack } = useNavigation();
  return <EthicsRuleClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
