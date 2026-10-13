import EquipmentCheck from '../../components/feature/CHK/EQU/EquipmentCheck';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_EQU_P01() {
  const goBack = useNavigationStore((state) => state.goBack);
  const goForward = useNavigationStore((state) => state.goForward);

  return <EquipmentCheck onBack={goBack} onNext={() => goForward('CHK_ACC_P01')} />;
}
