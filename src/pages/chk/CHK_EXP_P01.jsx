import PackingIntro from '../../components/feature/CHK/EXP/PackingIntro';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_EXP_P01() {
  const { goForward } = useNavigation();

  return <PackingIntro onNext={() => goForward('CHK_DOC_P01')} />;
}
