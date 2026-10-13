import EthicsRulePage from "../../../components/feature/PTH/RTH/EthicsRulePage";
import useEthicsRuleNavigation from "./useEthicsRuleNavigation";

export default function PTH_ETH_P01() {
  const { handleBack, handleNext } = useEthicsRuleNavigation("PTH_ETH_P02");
  return <EthicsRulePage step={1} onBack={handleBack} onNext={handleNext} />;
}
