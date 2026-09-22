import { useState } from 'react';
import { DialogProvider } from './components/common/dialog/DialogContext';
import AppRoutes from './routes/AppRoutes';
import ChatEntryButton from './components/common/layout/ChatEntryButton';
import ChatPanel from './components/common/layout/ChatPanel';
import DevTracePanel from './devtrace/DevTracePanel';

// 챗봇 진입 버튼/팝업은 데모 화면 어디서든 떠 있어야 해서 라우트 최상위인 여기서 관리함
// (페이지마다 각자 붙이면 빠뜨리는 화면이 생기기 쉬움)
// DevTracePanel도 같은 이유로 여기 둠 — 내부적으로 /demo/* 경로가 아니면 스스로 null을 반환함
function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <DialogProvider>
      <AppRoutes />
      <ChatEntryButton onClick={() => setChatOpen(true)} />
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
      <DevTracePanel />
    </DialogProvider>
  );
}

export default App
