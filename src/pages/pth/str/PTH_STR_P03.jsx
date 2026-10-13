import FingerStoryPage from "../../../components/feature/PTH/STR/FingerStoryPage";
import useFingerStoryNavigation from "./useFingerStoryNavigation";

export default function PTH_STR_P03() {
  const { handleBack, handleNext } = useFingerStoryNavigation("PTH_STR_P04");
  return <FingerStoryPage step={3} onBack={handleBack} onNext={handleNext} />;
}
