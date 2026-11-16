import PreboardingLogin from '../../components/feature/PB/LGN/P01/PreboardingLogin';
import useNavigation from '../../hooks/useNavigation';
import { login } from '../../services/authService';

export default function PB_LGN_P01() {
  const { goForward } = useNavigation();
  const handleLogin = async ({ employeeNo, birthDate }) => {
    const session = await login(employeeNo, birthDate);
    if (!goForward(session.redirectScreen)) throw new Error('이동할 화면 정보를 찾을 수 없습니다.');
  };
  return <PreboardingLogin onSubmit={handleLogin} />;
}
