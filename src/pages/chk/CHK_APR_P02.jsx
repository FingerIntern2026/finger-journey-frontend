import ApprovalGuide from '../../components/feature/CHK/APR/ApprovalGuide';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_APR_P02() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  return <ApprovalGuide onBack={goBack} onNext={() => goForward('CHK_APR_P03')} />;
}
