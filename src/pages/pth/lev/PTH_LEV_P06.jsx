import LevelUpClear from "../../../components/feature/PTH/LEV/LevelUpClear";
import useNavigationStore from "../../../stores/useNavigationStore";
export default function PTH_LEV_P06() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <LevelUpClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
