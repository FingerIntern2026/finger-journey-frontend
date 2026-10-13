import DocumentCheck from '../../components/feature/CHK/DOC/DocumentCheck';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_DOC_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  return <DocumentCheck onBack={goBack} onNext={() => goForward('CHK_EQU_P01')} />;
}
