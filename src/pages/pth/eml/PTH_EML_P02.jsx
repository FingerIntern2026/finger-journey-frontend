import EmailGuideClear from "../../../components/feature/PTH/EML/EmailGuideClear";
import useNavigation from "../../../hooks/useNavigation";

export default function PTH_EML_P02() {
  const { goForward, goBack } = useNavigation();
  return <EmailGuideClear onBack={goBack} onComplete={() => goForward("PTH_MAP_P01")} />;
}
