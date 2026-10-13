import LevelUpPage from "../../../components/feature/PTH/LEV/LevelUpPage";
import useNavigationStore from "../../../stores/useNavigationStore";
export default function PTH_LEV_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <LevelUpPage step={1} onBack={goBack} onNext={() => goForward("PTH_LEV_P02")} />;
}
