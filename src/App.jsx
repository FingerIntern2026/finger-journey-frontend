// 역할: 앱 전체를 감싸는 최상위 컴포넌트. DialogProvider로 다이얼로그 컨텍스트를 제공하고,
//       AppRoutes로 라우팅을, GlobalLoading으로 전역 로딩 스피너를 최상단에 한 번 연결함
// 사용처: main.jsx (앱 진입점)
// 담당자:

import { DialogProvider } from './components/common/dialog/DialogContext';
import AppRoutes from './routes/AppRoutes';
import GlobalLoading from './components/common/custom/GlobalLoading';

function App() {
  return (
    <DialogProvider>
      <AppRoutes />
      <GlobalLoading />
    </DialogProvider>
  );
}

export default App