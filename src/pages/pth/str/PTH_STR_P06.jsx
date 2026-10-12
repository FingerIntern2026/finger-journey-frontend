import FingerStoryPage from "../../../components/feature/PTH/STR/FingerStoryPage";
import useFingerStoryNavigation from "./useFingerStoryNavigation";

export default function PTH_STR_P06() {
  const { handleBack, handleNext } = useFingerStoryNavigation("PTH_STR_P07");
  return <FingerStoryPage step={6} onBack={handleBack} onNext={handleNext} />;
}
