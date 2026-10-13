import LevelUpPage from "../../../components/feature/PTH/LEV/LevelUpPage";
import useLevelUpNavigation from "./useLevelUpNavigation";
export default function PTH_LEV_P03() {
  const { handleBack, handleNext } = useLevelUpNavigation("PTH_LEV_P04");
  return <LevelUpPage step={3} onBack={handleBack} onNext={handleNext} />;
}
