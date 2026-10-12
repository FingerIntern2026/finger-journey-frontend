import FingerStoryClear from "../../../components/feature/PTH/STR/FingerStoryClear";
import useFingerStoryNavigation from "./useFingerStoryNavigation";

export default function PTH_STR_P07() {
  const { handleBack, handleNext } = useFingerStoryNavigation("PTH_MAP_P01");
  return <FingerStoryClear onBack={handleBack} onComplete={handleNext} />;
}
