import EmploymentRulePage from "../../../components/feature/PTH/RUL/EmploymentRulePage";
import useEmploymentRuleNavigation from "./useEmploymentRuleNavigation";

export default function PTH_RUL_P05() {
  const { handleBack, handleNext } = useEmploymentRuleNavigation("PTH_RUL_P06");
  return <EmploymentRulePage step={5} onBack={handleBack} onNext={handleNext} />;
}
