import OfficeSelect from '../../components/feature/CHK/SEA/OfficeSelect';
import BagGateNotice from '../../components/feature/CHK/common/BagGateNotice';
import useBagGate from '../../hooks/useBagGate';
import useNavigation from '../../hooks/useNavigation';

// 체크인 5번 항목(좌석 배정 확인): HR이 확인해야 체크인 완료 화면으로 넘어간다.
export default function CHK_SEA_P01() {
  const { goForward, goBack } = useNavigation();
  const gate = useBagGate(5);

  return (
    <>
      <OfficeSelect
        onBack={goBack}
        onSelectJongno={() => goForward('CHK_SEA_P02')}
        onSelectYeouido={() => goForward('CHK_SEA_P03')}
        onNext={() => gate.requestNext(() => goForward('CHK_FIN_P01'))}
      />
      <BagGateNotice waiting={gate.waiting} errorMessage={gate.errorMessage} />
    </>
  );
}
