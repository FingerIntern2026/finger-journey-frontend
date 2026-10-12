import EmploymentRulePage from "../../../components/feature/PTH/RUL/EmploymentRulePage";
import useEmploymentRuleNavigation from "./useEmploymentRuleNavigation";

export default function PTH_RUL_P01() {
  const { handleBack, handleNext } = useEmploymentRuleNavigation("PTH_RUL_P02");
  return <EmploymentRulePage step={1} onBack={handleBack} onNext={handleNext} />;
}
