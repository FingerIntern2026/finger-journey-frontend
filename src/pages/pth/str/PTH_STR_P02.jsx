import FingerStoryPage from "../../../components/feature/PTH/STR/FingerStoryPage";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_STR_P02() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <FingerStoryPage step={2} onBack={goBack} onNext={() => goForward("PTH_STR_P03")} />;
}
