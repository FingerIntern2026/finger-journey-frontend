// 역할: 앱 전체를 감싸는 최상위 컴포넌트. DialogProvider로 다이얼로그 컨텍스트를 제공하고,
//       AppRoutes로 라우팅을, GlobalLoading으로 전역 로딩 스피너를, ChatEntryButton/ChatPanel로
//       챗봇을, DevTracePanel로 데모용 인터랙션 추적 패널을 최상단에 한 번씩 연결함
// 사용처: main.jsx (앱 진입점)
// 담당자:

import { useEffect, useState } from 'react';
import { DialogProvider } from './components/common/dialog/DialogContext';
import AppRoutes from './routes/AppRoutes';
import GlobalLoading from './components/common/custom/GlobalLoading';
import ChatEntryButton from './components/common/layout/ChatEntryButton';
import ChatPanel from './components/common/layout/ChatPanel';
import DevTracePanel from './devtrace/DevTracePanel';
import { fetchScreenList } from './utils/screenConfig';

// 챗봇 진입 버튼/팝업은 데모 화면 어디서든 떠 있어야 해서 라우트 최상위인 여기서 관리함
// (페이지마다 각자 붙이면 빠뜨리는 화면이 생기기 쉬움)
// DevTracePanel도 같은 이유로 여기 둠 — 내부적으로 /demo/* 경로가 아니면 스스로 null을 반환함
function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [screens, setScreens] = useState(null);
  const [screenLoadError, setScreenLoadError] = useState(null);

  useEffect(() => {
    let active = true;

    fetchScreenList()
      .then((loadedScreens) => {
        if (active) setScreens(loadedScreens);
      })
      .catch((error) => {
        if (active) setScreenLoadError(error);
      });

    return () => {
      active = false;
    };
  }, []);

  if (screenLoadError) {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 20 }}>화면정보를 불러오지 못했습니다.</h1>
        <p>{screenLoadError.message}</p>
      </main>
    );
  }

  if (!screens) {
    return <GlobalLoading />;
  }

  return (
    <DialogProvider>
      <AppRoutes screens={screens} />
      <GlobalLoading />
      <ChatEntryButton onClick={() => setChatOpen(true)} />
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
      <DevTracePanel />
    </DialogProvider>
  );
}

export default App
