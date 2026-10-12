import EthicsRulePage from "../../../components/feature/PTH/RTH/EthicsRulePage";
import useEthicsRuleNavigation from "./useEthicsRuleNavigation";

export default function PTH_ETH_P04() {
  const { handleBack, handleNext } = useEthicsRuleNavigation("PTH_ETH_P05");
  return <EthicsRulePage step={4} onBack={handleBack} onNext={handleNext} />;
}
