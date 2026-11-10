import CheckinComplete from '../../components/feature/CHK/FIN/CheckinComplete';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_FIN_P01() {
  const { goForward } = useNavigation();

  return <CheckinComplete onComplete={() => goForward('PTH_MAP_P01')} />;
}
