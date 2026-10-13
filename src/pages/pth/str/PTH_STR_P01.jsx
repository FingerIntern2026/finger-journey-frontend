import FingerStoryPage from "../../../components/feature/PTH/STR/FingerStoryPage";
import useFingerStoryNavigation from "./useFingerStoryNavigation";

export default function PTH_STR_P01() {
  const { handleBack, handleNext } = useFingerStoryNavigation("PTH_STR_P02");
  return <FingerStoryPage step={1} onBack={handleBack} onNext={handleNext} />;
}
