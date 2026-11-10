import FingerStoryClear from "../../../components/feature/PTH/STR/FingerStoryClear";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_STR_P07() {
  const { goForward, goBack } = useNavigation();
  return <FingerStoryClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
