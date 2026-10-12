import ForestPage from "../../../components/feature/PTH/FOR/ForestPage";
import useForestNavigation from "./useForestNavigation";
export default function PTH_FOR_P01() {
  const { handleBack, handleNext } = useForestNavigation("PTH_FOR_P02");
  return <ForestPage step={1} onBack={handleBack} onNext={handleNext} />;
}
