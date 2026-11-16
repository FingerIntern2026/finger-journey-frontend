import ForestLogin from '../../components/feature/CHK/ACC/ForestLogin';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_ACC_P02() {
  const { goForward, goBack } = useNavigation();

  return <ForestLogin onBack={goBack} onNext={() => goForward('CHK_APR_P01')} />;
}
