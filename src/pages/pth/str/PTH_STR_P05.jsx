import FingerStoryPage from "../../../components/feature/PTH/STR/FingerStoryPage";
import useFingerStoryNavigation from "./useFingerStoryNavigation";

export default function PTH_STR_P05() {
  const { handleBack, handleNext } = useFingerStoryNavigation("PTH_STR_P06");
  return <FingerStoryPage step={5} onBack={handleBack} onNext={handleNext} />;
}
