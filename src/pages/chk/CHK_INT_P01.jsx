import CheckinPassword from '../../components/feature/CHK/INT/CheckinPassword';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_INT_P01() {
  const { goForward } = useNavigation();

  return <CheckinPassword onSubmit={() => goForward('CHK_EXP_P01')} />;
}
