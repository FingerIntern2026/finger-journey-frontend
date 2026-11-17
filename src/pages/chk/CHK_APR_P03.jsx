import ApprovalComplete from '../../components/feature/CHK/APR/ApprovalComplete';
import BagGateNotice from '../../components/feature/CHK/common/BagGateNotice';
import useBagGate from '../../hooks/useBagGate';
import useNavigation from '../../hooks/useNavigation';

// 체크인 4번 항목(계약서 작성)의 마지막 화면: HR이 확인해야 다음(좌석)으로 넘어간다.
export default function CHK_APR_P03() {
  const { goForward, goBack } = useNavigation();
  const gate = useBagGate(4);

  return (
    <>
      <ApprovalComplete onBack={goBack} onNext={() => gate.requestNext(() => goForward('CHK_SEA_P01'))} />
      <BagGateNotice waiting={gate.waiting} errorMessage={gate.errorMessage} />
    </>
  );
}
