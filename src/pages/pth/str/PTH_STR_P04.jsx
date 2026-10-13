import FingerStoryPage from "../../../components/feature/PTH/STR/FingerStoryPage";
import useFingerStoryNavigation from "./useFingerStoryNavigation";

export default function PTH_STR_P04() {
  const { handleBack, handleNext } = useFingerStoryNavigation("PTH_STR_P05");
  return <FingerStoryPage step={4} onBack={handleBack} onNext={handleNext} />;
}
