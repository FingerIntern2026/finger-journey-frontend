import CheckinPassword from '../../components/feature/CHK/INT/CheckinPassword';
import { verifyCheckinPassword } from '../../api/checkinApi';
import useNavigation from '../../hooks/useNavigation';

export default function CHK_INT_P01() {
  const { goForward } = useNavigation();

  // 서버가 비밀번호를 확인해서 맞을 때만 다음 화면으로 넘어간다. 틀리면 오류가 CheckinPassword로 전달된다.
  const handleSubmit = async (password) => {
    await verifyCheckinPassword(password);
    goForward('CHK_EXP_P01');
  };

  return <CheckinPassword onSubmit={handleSubmit} />;
}
