import OfficeSelect from '../../components/feature/CHK/SEA/OfficeSelect';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_SEA_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  return (
    <OfficeSelect
      onBack={goBack}
      onSelectJongno={() => goForward('CHK_SEA_P02')}
      onSelectYeouido={() => goForward('CHK_SEA_P03')}
      onNext={() => goForward('CHK_FIN_P01')}
    />
  );
}
