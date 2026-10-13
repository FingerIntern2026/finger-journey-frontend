import ApprovalIntro from '../../components/feature/CHK/APR/ApprovalIntro';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_APR_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  return <ApprovalIntro onBack={goBack} onNext={() => goForward('CHK_APR_P02')} />;
}
