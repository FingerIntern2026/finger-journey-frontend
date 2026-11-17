import ForestClear from "../../../components/feature/PTH/FOR/ForestClear";
import useNavigation from "../../../hooks/useNavigation";
import useStageClear from "../../../hooks/useStageClear";
export default function PTH_FOR_P07() {
  const { goBack } = useNavigation();
  const clearStage = useStageClear(7);
  return <ForestClear onBack={goBack} onComplete={clearStage} />;
}
