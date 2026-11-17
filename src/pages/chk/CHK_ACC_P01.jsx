import ErpAccountGuide from '../../components/feature/CHK/ACC/ErpAccountGuide';
import useBagGate from '../../hooks/useBagGate';
import useNavigation from '../../hooks/useNavigation';

// 체크인 3번 항목(계정 발급 확인)의 첫 화면: 들어오면 항목에 진입한다. 확인 대기는 다음 화면(포레스트 로그인)에서 한다.
export default function CHK_ACC_P01() {
  const { goForward, goBack } = useNavigation();
  useBagGate(3);

  return <ErpAccountGuide onBack={goBack} onNext={() => goForward('CHK_ACC_P02')} />;
}
