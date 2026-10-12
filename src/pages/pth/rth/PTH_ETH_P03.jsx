import EthicsRulePage from "../../../components/feature/PTH/RTH/EthicsRulePage";
import useEthicsRuleNavigation from "./useEthicsRuleNavigation";

export default function PTH_ETH_P03() {
  const { handleBack, handleNext } = useEthicsRuleNavigation("PTH_ETH_P04");
  return <EthicsRulePage step={3} onBack={handleBack} onNext={handleNext} />;
}
