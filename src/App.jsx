// 역할: 앱 전체를 감싸는 최상위 컴포넌트. DialogProvider로 다이얼로그 컨텍스트를 제공하고,
//       AppRoutes로 라우팅을, GlobalLoading으로 전역 로딩 스피너를, ChatEntryButton/ChatPanel로
//       챗봇을 최상단에 한 번씩 연결함
// 사용처: main.jsx (앱 진입점)
// 담당자: 김재웅

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DialogProvider } from './components/common/dialog/DialogContext';
import AppRoutes from './routes/AppRoutes';
import GlobalLoading from './components/common/feedback/GlobalLoading';
import ChatEntryButton from './components/common/layout/ChatEntryButton';
import ChatPanel from './components/common/layout/ChatPanel';
import ScreenNavigationPanel from './components/common/layout/ScreenNavigationPanel';
import { APP_ENTRY_SCREEN_CODE } from './config/appEntry';
import useNavigationStore from './stores/useNavigationStore';
import { fetchScreenList } from './services/screenService';

// 챗봇 진입 버튼/팝업은 서비스 화면 어디서든 떠 있어야 해서 라우트 최상위인 여기서 관리함
// (페이지마다 각자 붙이면 빠뜨리는 화면이 생기기 쉬움)
function App() {
  const [chatOpen, setChatOpen] = useState(false);

  const [screens, setScreens] = useState(null);
  const [screenLoadError, setScreenLoadError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const syncNavigation = useNavigationStore((state) => state.syncNavigation);
  const currentPath = useNavigationStore((state) => state.nowPageParams.path);
  const currentScreenCode = screens?.find((screen) => screen.routePath === currentPath)?.screenCode ?? '';

  useEffect(() => {
    let active = true;

    fetchScreenList()
      .then((loadedScreens) => {
        if (!active) return;
        const homeScreen = loadedScreens.find(
            (screen) => screen.screenCode === APP_ENTRY_SCREEN_CODE);
        if (!homeScreen) throw new Error(`메인 화면정보를 찾을 수 없습니다: ${APP_ENTRY_SCREEN_CODE}`);

        setScreens(loadedScreens);
      })

      .catch((error) => {
        if (active) setScreenLoadError(error);
      });

    return () => {
      active = false;
    };
  }, []);

  // 주소가 바뀌면 현재 화면 정보를 스토어에 저장한다.
  useEffect(() => {
    if (!screens) {
      return;
    }

    const isKnownPath = screens.some((screen) => screen.routePath === location.pathname);

    // 루트 경로와 등록되지 않은 주소는 시작 화면으로 보낸다.
    if (!isKnownPath) {
      const homeScreen = screens.find((screen) => screen.screenCode === APP_ENTRY_SCREEN_CODE);
      navigate(homeScreen.routePath, { replace: true });
      return;
    }

    syncNavigation({
      path: location.pathname,
      params: location.state?.params,
      historyStack: location.state?.historyStack,
    });
  }, [screens, location, navigate, syncNavigation]);

  if (screenLoadError) {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 20 }}>화면정보를 불러오지 못했습니다.</h1>
        <p>{screenLoadError.message}</p>
      </main>
    );
  }

  // 첫 화면 정보가 스토어에 저장되기 전까지 로딩을 표시한다.
  if (!screens || currentPath === '/') {
    return <GlobalLoading forceVisible initial />;
  }

  return (
    <DialogProvider>
      <AppRoutes screens={screens} />
      <ScreenNavigationPanel screens={screens} />
      <GlobalLoading />
      {currentScreenCode !== 'CHT_MAN_F01' && (
        <ChatEntryButton
          raised={currentScreenCode.startsWith('ADM_')}
          onClick={() => setChatOpen(true)}
        />
      )}
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </DialogProvider>
  );
}

export default App
