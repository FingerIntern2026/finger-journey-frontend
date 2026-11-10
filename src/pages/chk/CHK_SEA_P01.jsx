import OfficeSelect from '../../components/feature/CHK/SEA/OfficeSelect';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_SEA_P01() {
  const { goForward, goBack } = useNavigation();

  return (
    <OfficeSelect
      onBack={goBack}
      onSelectJongno={() => goForward('CHK_SEA_P02')}
      onSelectYeouido={() => goForward('CHK_SEA_P03')}
      onNext={() => goForward('CHK_FIN_P01')}
    />
  );
}
