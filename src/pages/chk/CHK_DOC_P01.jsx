import DocumentCheck from '../../components/feature/CHK/DOC/DocumentCheck';
import BagGateNotice from '../../components/feature/CHK/common/BagGateNotice';
import useBagGate from '../../hooks/useBagGate';
import useNavigation from '../../hooks/useNavigation';

// 체크인 1번 항목(서류 확인): HR이 확인해야 다음(장비 확인)으로 넘어간다.
export default function CHK_DOC_P01() {
  const { goForward, goBack } = useNavigation();
  const gate = useBagGate(1);

  return (
    <>
      <DocumentCheck onBack={goBack} onNext={() => gate.requestNext(() => goForward('CHK_EQU_P01'))} />
      <BagGateNotice waiting={gate.waiting} errorMessage={gate.errorMessage} />
    </>
  );
}
