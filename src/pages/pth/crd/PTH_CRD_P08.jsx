import CorporateCardClear from "../../../components/feature/PTH/CRD/CorporateCardClear";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_CRD_P08() {
  const { goForward, goBack } = useNavigation();
  return <CorporateCardClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
