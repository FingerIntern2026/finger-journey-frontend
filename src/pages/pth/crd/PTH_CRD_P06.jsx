import CorporateCardPage from "../../../components/feature/PTH/CRD/CorporateCardPage";
import useCorporateCardNavigation from "./useCorporateCardNavigation";

export default function PTH_CRD_P06() {
  const { handleBack, handleNext } = useCorporateCardNavigation("PTH_CRD_P07");
  return <CorporateCardPage step={6} onBack={handleBack} onNext={handleNext} />;
}
