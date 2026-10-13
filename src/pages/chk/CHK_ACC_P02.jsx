import ForestLogin from '../../components/feature/CHK/ACC/ForestLogin';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_ACC_P02() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  return <ForestLogin onBack={goBack} onNext={() => goForward('CHK_APR_P01')} />;
}
