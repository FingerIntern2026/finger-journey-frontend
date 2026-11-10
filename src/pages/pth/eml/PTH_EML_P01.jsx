import EmailGuidePage from "../../../components/feature/PTH/EML/EmailGuidePage";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_EML_P01() {
  const { goForward, goBack } = useNavigation();
  return <EmailGuidePage onBack={goBack} onNext={() => goForward("PTH_EML_P02")} />;
}
