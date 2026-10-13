import EmploymentRulePage from "../../../components/feature/PTH/RUL/EmploymentRulePage";
import useEmploymentRuleNavigation from "./useEmploymentRuleNavigation";

export default function PTH_RUL_P06() {
  const { handleBack, handleNext } = useEmploymentRuleNavigation("PTH_RUL_P07");
  return <EmploymentRulePage step={6} onBack={handleBack} onNext={handleNext} />;
}
