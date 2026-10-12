import EmploymentRulePage from "../../../components/feature/PTH/RUL/EmploymentRulePage";
import useEmploymentRuleNavigation from "./useEmploymentRuleNavigation";

export default function PTH_RUL_P04() {
  const { handleBack, handleNext } = useEmploymentRuleNavigation("PTH_RUL_P05");
  return <EmploymentRulePage step={4} onBack={handleBack} onNext={handleNext} />;
}
