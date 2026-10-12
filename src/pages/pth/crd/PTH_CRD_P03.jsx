import CorporateCardPage from "../../../components/feature/PTH/CRD/CorporateCardPage";
import useCorporateCardNavigation from "./useCorporateCardNavigation";

export default function PTH_CRD_P03() {
  const { handleBack, handleNext } = useCorporateCardNavigation("PTH_CRD_P04");
  return <CorporateCardPage step={3} onBack={handleBack} onNext={handleNext} />;
}
