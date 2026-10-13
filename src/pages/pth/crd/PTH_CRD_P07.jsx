import CorporateCardPage from "../../../components/feature/PTH/CRD/CorporateCardPage";
import useCorporateCardNavigation from "./useCorporateCardNavigation";

export default function PTH_CRD_P07() {
  const { handleBack, handleNext } = useCorporateCardNavigation("PTH_CRD_P08");
  return <CorporateCardPage step={7} onBack={handleBack} onNext={handleNext} />;
}
