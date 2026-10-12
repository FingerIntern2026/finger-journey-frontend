import EmploymentRulePage from "../../../components/feature/PTH/RUL/EmploymentRulePage";
import useEmploymentRuleNavigation from "./useEmploymentRuleNavigation";

export default function PTH_RUL_P03() {
  const { handleBack, handleNext } = useEmploymentRuleNavigation("PTH_RUL_P04");
  return <EmploymentRulePage step={3} onBack={handleBack} onNext={handleNext} />;
}
