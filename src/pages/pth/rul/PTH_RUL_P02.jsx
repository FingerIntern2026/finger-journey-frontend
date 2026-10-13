import EmploymentRulePage from "../../../components/feature/PTH/RUL/EmploymentRulePage";
import useEmploymentRuleNavigation from "./useEmploymentRuleNavigation";

export default function PTH_RUL_P02() {
  const { handleBack, handleNext } = useEmploymentRuleNavigation("PTH_RUL_P03");
  return <EmploymentRulePage step={2} onBack={handleBack} onNext={handleNext} />;
}
