import ForestPage from "../../../components/feature/PTH/FOR/ForestPage";
import useForestNavigation from "./useForestNavigation";
export default function PTH_FOR_P04() {
  const { handleBack, handleNext } = useForestNavigation("PTH_FOR_P05");
  return <ForestPage step={4} onBack={handleBack} onNext={handleNext} />;
}
