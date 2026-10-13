import OfficeMap from '../../components/feature/CHK/SEA/OfficeMap';
import useNavigationStore from '../../stores/useNavigationStore';
import yeouidoMap from '../../assets/checkin/yeouido-map.png';

export default function CHK_SEA_P03() {
  const goBack = useNavigationStore((state) => state.goBack);

  return <OfficeMap title="여의도 포레스트" image={yeouidoMap} imageTitle="여의도 포레스트 좌석 배치도" viewBox="15 17 351 515" width={381} height={532} wide onBack={goBack} />;
}
