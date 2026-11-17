import LevelUpClear from "../../../components/feature/PTH/LEV/LevelUpClear";
import useNavigation from "../../../hooks/useNavigation";
import useStageClear from "../../../hooks/useStageClear";
export default function PTH_LEV_P06() {
  const { goBack } = useNavigation();
  const clearStage = useStageClear(8);
  return <LevelUpClear onBack={goBack} onComplete={clearStage} />;
}
