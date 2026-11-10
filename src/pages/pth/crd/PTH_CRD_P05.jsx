import CorporateCardPage from "../../../components/feature/PTH/CRD/CorporateCardPage";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_CRD_P05() {
  const { goForward, goBack } = useNavigation();
  return <CorporateCardPage step={5} onBack={goBack} onNext={() => goForward("PTH_CRD_P06")} />;
}
