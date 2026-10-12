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
import { SCREEN_CODES } from './config/screenCodes';
import useNavigationStore from './stores/useNavigationStore';
import { fetchScreenList } from './services/screenService';
import PreboardingPreview from './pages/dev/PreboardingPreview';
import AdminPreview from './pages/dev/AdminPreview';
import WikiPreview from './pages/dev/WikiPreview';
import ChatPreview from './pages/dev/ChatPreview';
import PTH_MAP_P01 from './pages/pth/PTH_MAP_P01';
import FingerStoryPreview from './pages/dev/FingerStoryPreview';
import EmploymentRulePreview from './pages/dev/EmploymentRulePreview';

// 챗봇 진입 버튼/팝업은 데모 화면 어디서든 떠 있어야 해서 라우트 최상위인 여기서 관리함
// (페이지마다 각자 붙이면 빠뜨리는 화면이 생기기 쉬움)
function App() {
  const previewType = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get('preview')
    : null;
  const isPathMapPreview = import.meta.env.DEV && window.location.pathname === '/pth/map';
  const isFingerStoryPreview = import.meta.env.DEV && window.location.pathname === '/pth/str';
  const isEmploymentRulePreview = import.meta.env.DEV && window.location.pathname === '/pth/rul';
  const isPublishingPreview = previewType === 'preboarding' || previewType === 'admin' || previewType === 'wiki' || previewType === 'chat' || isPathMapPreview || isFingerStoryPreview || isEmploymentRulePreview;
  const [chatOpen, setChatOpen] = useState(false);
  const [screens, setScreens] = useState(null);
  const [screenLoadError, setScreenLoadError] = useState(null);
  const initializeNavigation = useNavigationStore((state) => state.initializeNavigation);

  useEffect(() => {
    // 개발 중 화면 퍼블리싱만 확인할 때는 백엔드 화면목록 요청을 하지 않는다.
    if (isPublishingPreview) {
      return undefined;
    }

    let active = true;

    fetchScreenList()
      .then((loadedScreens) => {
        if (!active) return;
        const homeScreen = loadedScreens.find((screen) => screen.screenCode === SCREEN_CODES.DEMO_HOME);
        if (!homeScreen) throw new Error(`메인 화면정보를 찾을 수 없습니다: ${SCREEN_CODES.DEMO_HOME}`);

        initializeNavigation({ path: homeScreen.routePath, params: {} });
        setScreens(loadedScreens);
      })
      .catch((error) => {
        if (active) setScreenLoadError(error);
      });

    return () => {
      active = false;
    };
  }, [initializeNavigation, isPublishingPreview]);

  if (isEmploymentRulePreview) {
    return <EmploymentRulePreview />;
  }

  if (isFingerStoryPreview) {
    return <FingerStoryPreview />;
  }

  if (isPathMapPreview) {
    return <PTH_MAP_P01 preview />;
  }

  if (previewType === 'preboarding') {
    return <PreboardingPreview />;
  }

  if (previewType === 'admin') {
    return (
      <DialogProvider>
        <AdminPreview />
      </DialogProvider>
    );
  }

  if (previewType === 'wiki') {
    return <WikiPreview />;
  }

  if (previewType === 'chat') {
    return <ChatPreview />;
  }

  if (screenLoadError) {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 20 }}>화면정보를 불러오지 못했습니다.</h1>
        <p>{screenLoadError.message}</p>
      </main>
    );
  }

  if (!screens) {
    return <main role="status" style={{ padding: 24 }}>화면정보를 불러오는 중입니다.</main>;
  }

  return (
    <DialogProvider>
      <AppRoutes screens={screens} />
      <GlobalLoading />
      <ChatEntryButton onClick={() => setChatOpen(true)} />
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </DialogProvider>
  );
}

export default App
