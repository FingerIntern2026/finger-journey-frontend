import LevelUpClear from "../../../components/feature/PTH/LEV/LevelUpClear";
import useLevelUpNavigation from "./useLevelUpNavigation";
export default function PTH_LEV_P06() {
  const { handleBack, handleNext } = useLevelUpNavigation("PTH_MAP_P01");
  return <LevelUpClear onBack={handleBack} onComplete={handleNext} />;
}
