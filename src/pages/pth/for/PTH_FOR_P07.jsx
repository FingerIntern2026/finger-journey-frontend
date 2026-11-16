import ForestClear from "../../../components/feature/PTH/FOR/ForestClear";
import useNavigation from "../../../hooks/useNavigation";
export default function PTH_FOR_P07() {
  const { goForward, goBack } = useNavigation();
  return <ForestClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
