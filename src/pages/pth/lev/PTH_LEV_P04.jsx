import LevelUpPage from "../../../components/feature/PTH/LEV/LevelUpPage";
import useLevelUpNavigation from "./useLevelUpNavigation";
export default function PTH_LEV_P04() {
  const { handleBack, handleNext } = useLevelUpNavigation("PTH_LEV_P05");
  return <LevelUpPage step={4} onBack={handleBack} onNext={handleNext} />;
}
