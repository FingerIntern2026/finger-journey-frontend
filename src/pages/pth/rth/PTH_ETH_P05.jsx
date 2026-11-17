import EthicsRuleClear from "../../../components/feature/PTH/RTH/EthicsRuleClear";
import useNavigation from "../../../hooks/useNavigation";
import useStageClear from "../../../hooks/useStageClear";

export default function PTH_ETH_P05() {
  const { goBack } = useNavigation();
  const clearStage = useStageClear(4);
  return <EthicsRuleClear onBack={goBack} onComplete={clearStage} />;
}
