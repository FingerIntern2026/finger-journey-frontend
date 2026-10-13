import PackingIntro from '../../components/feature/CHK/EXP/PackingIntro';
import useNavigationStore from '../../stores/useNavigationStore';

export default function CHK_EXP_P01() {
  const goForward = useNavigationStore((state) => state.goForward);

  return <PackingIntro onNext={() => goForward('CHK_DOC_P01')} />;
}
