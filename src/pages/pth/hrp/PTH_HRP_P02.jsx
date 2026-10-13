import HrPolicyPage from "../../../components/feature/PTH/HRP/HrPolicyPage";
import useHrPolicyNavigation from "./useHrPolicyNavigation";

export default function PTH_HRP_P02() {
  const { handleBack, handleNext } = useHrPolicyNavigation("PTH_HRP_P03");
  return <HrPolicyPage step={2} onBack={handleBack} onNext={handleNext} />;
}
