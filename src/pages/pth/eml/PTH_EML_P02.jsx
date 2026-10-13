import EmailGuideClear from "../../../components/feature/PTH/EML/EmailGuideClear";
import useNavigationStore from "../../../stores/useNavigationStore";

export default function PTH_EML_P02() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);
  return <EmailGuideClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
