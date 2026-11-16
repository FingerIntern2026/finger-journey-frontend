import LevelUpPage from "../../../components/feature/PTH/LEV/LevelUpPage";
import useNavigation from "../../../hooks/useNavigation";
export default function PTH_LEV_P05() {
  const { goForward, goBack } = useNavigation();
  return <LevelUpPage step={5} onBack={goBack} onNext={() => goForward("PTH_LEV_P06")} />;
}
