import HrPolicyPage from "../../../components/feature/PTH/HRP/HrPolicyPage";
import useHrPolicyNavigation from "./useHrPolicyNavigation";

export default function PTH_HRP_P03() {
  const { handleBack, handleNext } = useHrPolicyNavigation("PTH_HRP_P04");
  return <HrPolicyPage step={3} onBack={handleBack} onNext={handleNext} />;
}
