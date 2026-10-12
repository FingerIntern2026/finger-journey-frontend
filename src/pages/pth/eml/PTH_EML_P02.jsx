import EmailGuideClear from "../../../components/feature/PTH/EML/EmailGuideClear";
import useEmailNavigation from "./useEmailNavigation";

export default function PTH_EML_P02() {
  const { handleBack, handleNext } = useEmailNavigation("PTH_MAP_P01");
  return <EmailGuideClear onBack={handleBack} onComplete={handleNext} />;
}
