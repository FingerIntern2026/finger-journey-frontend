import EquipmentCheck from '../../components/feature/CHK/EQU/EquipmentCheck';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_EQU_P01() {
  const { goForward, goBack } = useNavigation();

  return <EquipmentCheck onBack={goBack} onNext={() => goForward('CHK_ACC_P01')} />;
}
