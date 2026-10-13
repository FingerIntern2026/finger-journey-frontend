import EthicsRulePage from "../../../components/feature/PTH/RTH/EthicsRulePage";
import useEthicsRuleNavigation from "./useEthicsRuleNavigation";

export default function PTH_ETH_P02() {
  const { handleBack, handleNext } = useEthicsRuleNavigation("PTH_ETH_P03");
  return <EthicsRulePage step={2} onBack={handleBack} onNext={handleNext} />;
}
