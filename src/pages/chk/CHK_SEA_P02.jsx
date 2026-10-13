import OfficeMap from '../../components/feature/CHK/SEA/OfficeMap';
import useNavigationStore from '../../stores/useNavigationStore';
import jongnoMap from '../../assets/checkin/jongno-map.png';

export default function CHK_SEA_P02() {
  const goBack = useNavigationStore((state) => state.goBack);

  return <OfficeMap title="종로 포레스트" image={jongnoMap} imageTitle="종로 포레스트 좌석 배치도" viewBox="30 8 348 491" width={459} height={499} onBack={goBack} />;
}
