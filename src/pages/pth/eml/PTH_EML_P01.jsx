import EmailGuidePage from "../../../components/feature/PTH/EML/EmailGuidePage";
import useEmailNavigation from "./useEmailNavigation";

export default function PTH_EML_P01() {
  const { handleBack, handleNext } = useEmailNavigation("PTH_EML_P02");
  return <EmailGuidePage onBack={handleBack} onNext={handleNext} />;
}
