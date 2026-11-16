import FingerStoryPage from "../../../components/feature/PTH/STR/FingerStoryPage";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_STR_P01() {
  const { goForward, goBack } = useNavigation();
  return <FingerStoryPage step={1} onBack={goBack} onNext={() => goForward("PTH_STR_P02")} />;
}
