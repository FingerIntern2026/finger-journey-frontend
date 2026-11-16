import DocumentCheck from '../../components/feature/CHK/DOC/DocumentCheck';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_DOC_P01() {
  const { goForward, goBack } = useNavigation();

  return <DocumentCheck onBack={goBack} onNext={() => goForward('CHK_EQU_P01')} />;
}
