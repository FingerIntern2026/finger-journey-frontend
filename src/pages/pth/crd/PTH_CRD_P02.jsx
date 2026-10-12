import CorporateCardPage from "../../../components/feature/PTH/CRD/CorporateCardPage";
import useCorporateCardNavigation from "./useCorporateCardNavigation";

export default function PTH_CRD_P02() {
  const { handleBack, handleNext } = useCorporateCardNavigation("PTH_CRD_P03");
  return <CorporateCardPage step={2} onBack={handleBack} onNext={handleNext} />;
}
