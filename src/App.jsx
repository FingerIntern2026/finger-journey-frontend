import { useState } from 'react'
import './App.css'
import BaseButton from './components/common/base/BaseButton';
import BaseBadge from './components/common/base/BaseBadge';
import DialogAlert from './components/common/dialog/DialogAlert';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
      <span>온보딩 진행 상태</span>
      <BaseBadge label="완료" color="green" />
      <BaseButton label="다음 단계로" onClick={() => alert('다음 스테이지로 이동')} />

      <BaseButton label="다이얼로그 열기" onClick={() => setIsOpen(true)} />

      <DialogAlert
          open={isOpen}
          message="인증에 실패했습니다"
          onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

export default App