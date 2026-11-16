import ApprovalComplete from '../../components/feature/CHK/APR/ApprovalComplete';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_APR_P03() {
  const { goForward, goBack } = useNavigation();

  return <ApprovalComplete onBack={goBack} onNext={() => goForward('CHK_SEA_P01')} />;
}
