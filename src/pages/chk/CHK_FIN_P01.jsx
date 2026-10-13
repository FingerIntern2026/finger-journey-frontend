import CheckinComplete from '../../components/feature/CHK/FIN/CheckinComplete';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_FIN_P01() {
  const goForward = useNavigationStore((state) => state.goForward);

  return <CheckinComplete onComplete={() => goForward('PTH_MAP_P01')} />;
}
