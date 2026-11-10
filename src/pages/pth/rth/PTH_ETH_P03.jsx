import EthicsRulePage from "../../../components/feature/PTH/RTH/EthicsRulePage";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_ETH_P03() {
  const { goForward, goBack } = useNavigation();
  return <EthicsRulePage step={3} onBack={goBack} onNext={() => goForward("PTH_ETH_P04")} />;
}
