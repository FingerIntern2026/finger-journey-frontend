import LevelUpPage from "../../../components/feature/PTH/LEV/LevelUpPage";
import useLevelUpNavigation from "./useLevelUpNavigation";
export default function PTH_LEV_P01() {
  const { handleBack, handleNext } = useLevelUpNavigation("PTH_LEV_P02");
  return <LevelUpPage step={1} onBack={handleBack} onNext={handleNext} />;
}
