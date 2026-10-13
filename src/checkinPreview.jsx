import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './checkinPreview.css';
import CheckinPasswordPage from './pages/checkin/CHK_INT_P01';
import PackingIntroPage from './pages/checkin/CHK_EXP_P01';
import DocumentCheckPage from './pages/checkin/CHK_DOC_P01';
import EquipmentCheckPage from './pages/checkin/CHK_EQU_P01';
import ErpAccountPage from './pages/checkin/CHK_ACC_P01';
import ForestLoginPage from './pages/checkin/CHK_ACC_P02';
import ApprovalIntroPage from './pages/checkin/CHK_APR_P01';
import ApprovalGuidePage from './pages/checkin/CHK_APR_P02';
import ApprovalCompletePage from './pages/checkin/CHK_APR_P03';
import OfficeSelectPage from './pages/checkin/CHK_SEA_P01';
import JongnoMapPage from './pages/checkin/CHK_SEA_P02';
import YeouidoMapPage from './pages/checkin/CHK_SEA_P03';
import CheckinCompletePage from './pages/checkin/CHK_FIN_P01';

const screens = [
  ['CHK_INT_P01', '체크인 암호 입력', CheckinPasswordPage],
  ['CHK_EXP_P01', '가방싸기 설명', PackingIntroPage],
  ['CHK_DOC_P01', '서류 접수 확인', DocumentCheckPage],
  ['CHK_EQU_P01', '업무 장비 확인', EquipmentCheckPage],
  ['CHK_ACC_P01', 'ERP 계정 확인', ErpAccountPage],
  ['CHK_ACC_P02', '포레스트 로그인', ForestLoginPage],
  ['CHK_APR_P01', '서류 결재 안내', ApprovalIntroPage],
  ['CHK_APR_P02', '서류 결재 작성', ApprovalGuidePage],
  ['CHK_APR_P03', '서류 결재 완료', ApprovalCompletePage],
  ['CHK_SEA_P01', '사무실 선택', OfficeSelectPage],
  ['CHK_SEA_P02', '종로 포레스트 약도', JongnoMapPage],
  ['CHK_SEA_P03', '여의도 포레스트 약도', YeouidoMapPage],
  ['CHK_FIN_P01', '체크인 완료', CheckinCompletePage],
];

function CheckinPreview() {
  const initialCode = new URLSearchParams(window.location.search).get('screen');
  const [selectedCode, setSelectedCode] = useState(
    screens.some(([code]) => code === initialCode) ? initialCode : screens[0][0]
  );
  const [, screenName, SelectedPage] = screens.find(([code]) => code === selectedCode);

  const changeScreen = (event) => {
    const code = event.target.value;
    setSelectedCode(code);
    window.history.replaceState(null, '', `?screen=${code}`);
  };

  return (
    <div className="preview-shell">
      <header className="preview-toolbar">
        <div>
          <strong>{selectedCode}</strong>
          <span>{screenName}</span>
        </div>
        <select value={selectedCode} onChange={changeScreen} aria-label="미리 볼 화면 선택">
          {screens.map(([code, name]) => <option key={code} value={code}>{code} · {name}</option>)}
        </select>
      </header>
      <div className="preview-phone" key={selectedCode}>
        <SelectedPage />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><CheckinPreview /></StrictMode>);
