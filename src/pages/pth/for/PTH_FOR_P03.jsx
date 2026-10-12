import ForestPage from "../../../components/feature/PTH/FOR/ForestPage";
import useForestNavigation from "./useForestNavigation";
export default function PTH_FOR_P03() {
  const { handleBack, handleNext } = useForestNavigation("PTH_FOR_P04");
  return <ForestPage step={3} onBack={handleBack} onNext={handleNext} />;
}
