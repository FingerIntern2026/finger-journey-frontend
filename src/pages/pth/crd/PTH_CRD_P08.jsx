import CorporateCardClear from "../../../components/feature/PTH/CRD/CorporateCardClear";
import useCorporateCardNavigation from "./useCorporateCardNavigation";

export default function PTH_CRD_P08() {
  const { handleBack, handleNext } = useCorporateCardNavigation("PTH_MAP_P01");
  return <CorporateCardClear onBack={handleBack} onComplete={handleNext} />;
}
