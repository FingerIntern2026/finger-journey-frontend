import ForestClear from "../../../components/feature/PTH/FOR/ForestClear";
import useForestNavigation from "./useForestNavigation";
export default function PTH_FOR_P07() {
  const { handleBack, handleNext } = useForestNavigation("PTH_MAP_P01");
  return <ForestClear onBack={handleBack} onComplete={handleNext} />;
}
