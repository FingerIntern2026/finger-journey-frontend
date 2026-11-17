import ApprovalIntro from '../../components/feature/CHK/APR/ApprovalIntro';
import useBagGate from '../../hooks/useBagGate';
import useNavigation from '../../hooks/useNavigation';

// 체크인 4번 항목(계약서 작성)의 첫 화면: 들어오면 항목에 진입한다. 확인 대기는 결재 완료 화면에서 한다.
export default function CHK_APR_P01() {
  const { goForward, goBack } = useNavigation();
  useBagGate(4);

  return <ApprovalIntro onBack={goBack} onNext={() => goForward('CHK_APR_P02')} />;
}
