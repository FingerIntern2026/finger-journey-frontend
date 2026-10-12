import EmploymentRuleClear from "../../../components/feature/PTH/RUL/EmploymentRuleClear";
import useEmploymentRuleNavigation from "./useEmploymentRuleNavigation";

export default function PTH_RUL_P07() {
  const { handleBack, handleNext } = useEmploymentRuleNavigation("PTH_MAP_P01");
  return <EmploymentRuleClear onBack={handleBack} onComplete={handleNext} />;
}
