import LevelUpPage from "../../../components/feature/PTH/LEV/LevelUpPage";
import useLevelUpNavigation from "./useLevelUpNavigation";
export default function PTH_LEV_P05() {
  const { handleBack, handleNext } = useLevelUpNavigation("PTH_LEV_P06");
  return <LevelUpPage step={5} onBack={handleBack} onNext={handleNext} />;
}
