import { DialogProvider } from './components/common/dialog/DialogContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <DialogProvider>
      <AppRoutes />
    </DialogProvider>
  );
}

export default App
