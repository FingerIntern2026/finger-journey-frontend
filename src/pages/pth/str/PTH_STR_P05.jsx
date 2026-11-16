import FingerStoryPage from "../../../components/feature/PTH/STR/FingerStoryPage";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_STR_P05() {
  const { goForward, goBack } = useNavigation();
  return <FingerStoryPage step={5} onBack={goBack} onNext={() => goForward("PTH_STR_P06")} />;
}
