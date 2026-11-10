import ForestPage from "../../../components/feature/PTH/FOR/ForestPage";
import useNavigation from "../../../hooks/useNavigation";
export default function PTH_FOR_P04() {
  const { goForward, goBack } = useNavigation();
  return <ForestPage step={4} onBack={goBack} onNext={() => goForward("PTH_FOR_P05")} />;
}
