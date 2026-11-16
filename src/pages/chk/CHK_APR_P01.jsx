import ApprovalIntro from '../../components/feature/CHK/APR/ApprovalIntro';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_APR_P01() {
  const { goForward, goBack } = useNavigation();

  return <ApprovalIntro onBack={goBack} onNext={() => goForward('CHK_APR_P02')} />;
}
