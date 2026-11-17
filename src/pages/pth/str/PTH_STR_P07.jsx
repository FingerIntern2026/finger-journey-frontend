import FingerStoryClear from "../../../components/feature/PTH/STR/FingerStoryClear";
import useNavigation from "../../../hooks/useNavigation";
import useStageClear from "../../../hooks/useStageClear";

export default function PTH_STR_P07() {
  const { goBack } = useNavigation();
  const clearStage = useStageClear(1);
  return <FingerStoryClear onBack={goBack} onComplete={clearStage} />;
}
