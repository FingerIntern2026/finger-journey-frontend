import ErpAccountGuide from '../../components/feature/CHK/ACC/ErpAccountGuide';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_ACC_P01() {
  const { goForward, goBack } = useNavigation();

  return <ErpAccountGuide onBack={goBack} onNext={() => goForward('CHK_ACC_P02')} />;
}
