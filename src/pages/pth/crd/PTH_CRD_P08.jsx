import CorporateCardClear from "../../../components/feature/PTH/CRD/CorporateCardClear";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_CRD_P08() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <CorporateCardClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
