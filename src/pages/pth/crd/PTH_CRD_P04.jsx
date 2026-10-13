import CorporateCardPage from "../../../components/feature/PTH/CRD/CorporateCardPage";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_CRD_P04() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <CorporateCardPage step={4} onBack={goBack} onNext={() => goForward("PTH_CRD_P05")} />;
}
