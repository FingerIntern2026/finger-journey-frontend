import ErpAccountGuide from '../../components/feature/CHK/ACC/ErpAccountGuide';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_ACC_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  return <ErpAccountGuide onBack={goBack} onNext={() => goForward('CHK_ACC_P02')} />;
}
