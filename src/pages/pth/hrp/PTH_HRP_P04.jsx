import HrPolicyClear from "../../../components/feature/PTH/HRP/HrPolicyClear";
import useHrPolicyNavigation from "./useHrPolicyNavigation";

export default function PTH_HRP_P04() {
  const { handleBack, handleNext } = useHrPolicyNavigation("PTH_MAP_P01");
  return <HrPolicyClear onBack={handleBack} onComplete={handleNext} />;
}
