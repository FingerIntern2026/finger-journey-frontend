import ForestPage from "../../../components/feature/PTH/FOR/ForestPage";
import useForestNavigation from "./useForestNavigation";
export default function PTH_FOR_P06() {
  const { handleBack, handleNext } = useForestNavigation("PTH_FOR_P07");
  return <ForestPage step={6} onBack={handleBack} onNext={handleNext} />;
}
