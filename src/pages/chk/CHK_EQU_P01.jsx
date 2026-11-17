import EquipmentCheck from '../../components/feature/CHK/EQU/EquipmentCheck';
import BagGateNotice from '../../components/feature/CHK/common/BagGateNotice';
import useBagGate from '../../hooks/useBagGate';
import useNavigation from '../../hooks/useNavigation';

// 체크인 2번 항목(업무 장비 확인): HR이 확인해야 다음(계정 발급)으로 넘어간다.
export default function CHK_EQU_P01() {
  const { goForward, goBack } = useNavigation();
  const gate = useBagGate(2);

  return (
    <>
      <EquipmentCheck onBack={goBack} onNext={() => gate.requestNext(() => goForward('CHK_ACC_P01'))} />
      <BagGateNotice waiting={gate.waiting} errorMessage={gate.errorMessage} />
    </>
  );
}
