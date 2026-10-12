import EthicsRuleClear from "../../../components/feature/PTH/RTH/EthicsRuleClear";
import useEthicsRuleNavigation from "./useEthicsRuleNavigation";

export default function PTH_ETH_P05() {
  const { handleBack, handleNext } = useEthicsRuleNavigation("PTH_MAP_P01");
  return <EthicsRuleClear onBack={handleBack} onComplete={handleNext} />;
}
