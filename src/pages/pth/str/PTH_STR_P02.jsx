import FingerStoryPage from "../../../components/feature/PTH/STR/FingerStoryPage";
import useFingerStoryNavigation from "./useFingerStoryNavigation";

export default function PTH_STR_P02() {
  const { handleBack, handleNext } = useFingerStoryNavigation("PTH_STR_P03");
  return <FingerStoryPage step={2} onBack={handleBack} onNext={handleNext} />;
}
