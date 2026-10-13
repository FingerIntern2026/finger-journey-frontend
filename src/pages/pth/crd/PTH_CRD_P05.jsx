import CorporateCardPage from "../../../components/feature/PTH/CRD/CorporateCardPage";
import useCorporateCardNavigation from "./useCorporateCardNavigation";

export default function PTH_CRD_P05() {
  const { handleBack, handleNext } = useCorporateCardNavigation("PTH_CRD_P06");
  return <CorporateCardPage step={5} onBack={handleBack} onNext={handleNext} />;
}
