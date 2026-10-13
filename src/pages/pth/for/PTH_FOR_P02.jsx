import ForestPage from "../../../components/feature/PTH/FOR/ForestPage";
import useForestNavigation from "./useForestNavigation";
export default function PTH_FOR_P02() {
  const { handleBack, handleNext } = useForestNavigation("PTH_FOR_P03");
  return <ForestPage step={2} onBack={handleBack} onNext={handleNext} />;
}
