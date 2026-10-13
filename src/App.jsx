// 역할: 앱 전체를 감싸는 최상위 컴포넌트. DialogProvider로 다이얼로그 컨텍스트를 제공하고,
//       AppRoutes로 라우팅을, GlobalLoading으로 전역 로딩 스피너를, ChatEntryButton/ChatPanel로
//       챗봇을 최상단에 한 번씩 연결함
// 사용처: main.jsx (앱 진입점)
// 담당자: 김재웅

import { useEffect, useState } from 'react';
import { DialogProvider } from './components/common/dialog/DialogContext';
import AppRoutes from './routes/AppRoutes';
import GlobalLoading from './components/common/feedback/GlobalLoading';
import ChatEntryButton from './components/common/layout/ChatEntryButton';
import ChatPanel from './components/common/layout/ChatPanel';
import ScreenNavigationPanel from './components/common/layout/ScreenNavigationPanel';
import { APP_ENTRY_SCREEN_CODE } from './config/appEntry';
import useNavigationStore, { createHistoryState } from './stores/useNavigationStore';
import { fetchScreenList } from './services/screenService';

// 챗봇 진입 버튼/팝업은 서비스 화면 어디서든 떠 있어야 해서 라우트 최상위인 여기서 관리함
// (페이지마다 각자 붙이면 빠뜨리는 화면이 생기기 쉬움)
function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [screens, setScreens] = useState(null);
  const [screenLoadError, setScreenLoadError] = useState(null);
  const initializeNavigation = useNavigationStore((state) => state.initializeNavigation);
  const syncNavigation = useNavigationStore((state) => state.syncNavigation);

  useEffect(() => {
    let active = true;

    fetchScreenList()
      .then((loadedScreens) => {
        if (!active) return;
        const homeScreen = loadedScreens.find((screen) => screen.screenCode === APP_ENTRY_SCREEN_CODE);
        if (!homeScreen) throw new Error(`메인 화면정보를 찾을 수 없습니다: ${APP_ENTRY_SCREEN_CODE}`);

        const requestedPath = window.location.pathname;
        const isRootPath = requestedPath === '/';
        const initialPath = isRootPath ? homeScreen.routePath : requestedPath;
        const initialParams = isRootPath ? {} : (window.history.state?.params ?? {});
        const initialNavigationIndex = isRootPath
          ? 0
          : (window.history.state?.navigationIndex ?? 0);

        window.history.replaceState(
          createHistoryState(initialParams, initialNavigationIndex),
          '',
          initialPath
        );

        initializeNavigation({
          path: initialPath,
          params: initialParams,
          navigationIndex: initialNavigationIndex,
        });
        setScreens(loadedScreens);
      })
      .catch((error) => {
        if (active) setScreenLoadError(error);
      });

    return () => {
      active = false;
    };
  }, [initializeNavigation]);

  useEffect(() => {
    if (!screens) {
      return undefined;
    }

    const handlePopState = (event) => {
      syncNavigation({
        path: window.location.pathname,
        params: event.state?.params ?? {},
        navigationIndex: event.state?.navigationIndex ?? 0,
      });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [screens, syncNavigation]);

  if (screenLoadError) {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 20 }}>화면정보를 불러오지 못했습니다.</h1>
        <p>{screenLoadError.message}</p>
      </main>
    );
  }

  if (!screens) {
    return <GlobalLoading forceVisible initial />;
  }

  return (
    <DialogProvider>
      <AppRoutes screens={screens} />
      <ScreenNavigationPanel screens={screens} />
      <GlobalLoading />
      <ChatEntryButton onClick={() => setChatOpen(true)} />
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </DialogProvider>
  );
}

export default App
