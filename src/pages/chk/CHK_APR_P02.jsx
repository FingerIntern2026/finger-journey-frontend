import ApprovalGuide from '../../components/feature/CHK/APR/ApprovalGuide';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_APR_P02() {
  const { goForward, goBack } = useNavigation();

  return <ApprovalGuide onBack={goBack} onNext={() => goForward('CHK_APR_P03')} />;
}
