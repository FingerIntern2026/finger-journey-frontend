import LevelUpClear from "../../../components/feature/PTH/LEV/LevelUpClear";
import useNavigation from "../../../hooks/useNavigation";
export default function PTH_LEV_P06() {
  const { goForward, goBack } = useNavigation();
  return <LevelUpClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
