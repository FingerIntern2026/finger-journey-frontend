import CheckinPassword from '../../components/feature/CHK/INT/CheckinPassword';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_INT_P01() {
  const goForward = useNavigationStore((state) => state.goForward);

  return <CheckinPassword onSubmit={() => goForward('CHK_EXP_P01')} />;
}
