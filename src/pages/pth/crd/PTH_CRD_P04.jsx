import CorporateCardPage from "../../../components/feature/PTH/CRD/CorporateCardPage";
import useCorporateCardNavigation from "./useCorporateCardNavigation";

export default function PTH_CRD_P04() {
  const { handleBack, handleNext } = useCorporateCardNavigation("PTH_CRD_P05");
  return <CorporateCardPage step={4} onBack={handleBack} onNext={handleNext} />;
}
