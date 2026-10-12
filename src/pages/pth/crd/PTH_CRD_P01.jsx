import CorporateCardPage from "../../../components/feature/PTH/CRD/CorporateCardPage";
import useCorporateCardNavigation from "./useCorporateCardNavigation";

export default function PTH_CRD_P01() {
  const { handleBack, handleNext } = useCorporateCardNavigation("PTH_CRD_P02");
  return <CorporateCardPage step={1} onBack={handleBack} onNext={handleNext} />;
}
