import ApprovalComplete from '../../components/feature/CHK/APR/ApprovalComplete';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_APR_P03() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  return <ApprovalComplete onBack={goBack} onNext={() => goForward('CHK_SEA_P01')} />;
}
