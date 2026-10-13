import ForestPage from "../../../components/feature/PTH/FOR/ForestPage";
import useForestNavigation from "./useForestNavigation";
export default function PTH_FOR_P05() {
  const { handleBack, handleNext } = useForestNavigation("PTH_FOR_P06");
  return <ForestPage step={5} onBack={handleBack} onNext={handleNext} />;
}
