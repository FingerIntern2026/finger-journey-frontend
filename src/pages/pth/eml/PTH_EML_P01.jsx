import EmailGuidePage from "../../../components/feature/PTH/EML/EmailGuidePage";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_EML_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <EmailGuidePage onBack={goBack} onNext={() => goForward("PTH_EML_P02")} />;
}
