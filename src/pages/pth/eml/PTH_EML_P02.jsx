import EmailGuideClear from "../../../components/feature/PTH/EML/EmailGuideClear";
import useNavigation from "../../../hooks/useNavigation";
import useStageClear from "../../../hooks/useStageClear";

export default function PTH_EML_P02() {
  const { goBack } = useNavigation();
  const clearStage = useStageClear(5);
  return <EmailGuideClear onBack={goBack} onComplete={clearStage} />;
}
