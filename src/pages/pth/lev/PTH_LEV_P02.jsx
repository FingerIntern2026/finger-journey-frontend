import LevelUpPage from "../../../components/feature/PTH/LEV/LevelUpPage";
import useLevelUpNavigation from "./useLevelUpNavigation";
export default function PTH_LEV_P02() {
  const { handleBack, handleNext } = useLevelUpNavigation("PTH_LEV_P03");
  return <LevelUpPage step={2} onBack={handleBack} onNext={handleNext} />;
}
