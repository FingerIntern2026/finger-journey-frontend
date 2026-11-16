import LevelUpPage from "../../../components/feature/PTH/LEV/LevelUpPage";
import useNavigation from "../../../hooks/useNavigation";
export default function PTH_LEV_P04() {
  const { goForward, goBack } = useNavigation();
  return <LevelUpPage step={4} onBack={goBack} onNext={() => goForward("PTH_LEV_P05")} />;
}
