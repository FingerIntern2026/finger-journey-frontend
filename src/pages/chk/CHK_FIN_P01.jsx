import { useState } from 'react';
import { completeBag } from '../../api/bagApi';
import CheckinComplete from '../../components/feature/CHK/FIN/CheckinComplete';
import BagGateNotice from '../../components/feature/CHK/common/BagGateNotice';
import useNavigation from '../../hooks/useNavigation';
import { parseApiError } from '../../utils/apiErrorUtils';

// 체크인 완료: 서버에 가방싸기 완료를 알려 온보딩 단계로 바꾼 뒤 오솔길로 이동한다.
// 모든 항목이 HR 확인을 받지 않았다면 서버가 BAG_001로 거절하고, 그 안내를 보여준다.
export default function CHK_FIN_P01() {
  const { goForward } = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleComplete = async () => {
    setErrorMessage('');
    try {
      await completeBag();
      goForward('PTH_MAP_P01');
    } catch (err) {
      setErrorMessage(parseApiError(err).message);
    }
  };

  return (
    <>
      <CheckinComplete onComplete={handleComplete} />
      <BagGateNotice waiting={false} errorMessage={errorMessage} />
    </>
  );
}
