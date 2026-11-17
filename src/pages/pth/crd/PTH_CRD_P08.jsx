import CorporateCardClear from "../../../components/feature/PTH/CRD/CorporateCardClear";
import useNavigation from "../../../hooks/useNavigation";
import useStageClear from "../../../hooks/useStageClear";

export default function PTH_CRD_P08() {
  const { goBack } = useNavigation();
  const clearStage = useStageClear(6);
  return <CorporateCardClear onBack={goBack} onComplete={clearStage} />;
}
