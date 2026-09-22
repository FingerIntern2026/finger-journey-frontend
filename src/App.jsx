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