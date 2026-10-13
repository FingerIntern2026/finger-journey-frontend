import HrPolicyPage from "../../../components/feature/PTH/HRP/HrPolicyPage";
import useHrPolicyNavigation from "./useHrPolicyNavigation";

export default function PTH_HRP_P01() {
  const { handleBack, handleNext } = useHrPolicyNavigation("PTH_HRP_P02");
  return <HrPolicyPage step={1} onBack={handleBack} onNext={handleNext} />;
}
