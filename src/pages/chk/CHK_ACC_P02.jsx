import ForestLogin from '../../components/feature/CHK/ACC/ForestLogin';
import BagGateNotice from '../../components/feature/CHK/common/BagGateNotice';
import useBagGate from '../../hooks/useBagGate';
import useNavigation from '../../hooks/useNavigation';

// 체크인 3번 항목(계정 발급 확인)의 마지막 화면: HR이 확인해야 다음(결재)으로 넘어간다.
export default function CHK_ACC_P02() {
  const { goForward, goBack } = useNavigation();
  const gate = useBagGate(3);

  return (
    <>
      <ForestLogin onBack={goBack} onNext={() => gate.requestNext(() => goForward('CHK_APR_P01'))} />
      <BagGateNotice waiting={gate.waiting} errorMessage={gate.errorMessage} />
    </>
  );
}
