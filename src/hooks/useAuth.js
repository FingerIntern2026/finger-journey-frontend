import useAuthStore from '../stores/authStore';
import { logout } from '../services/authService';

export function useAuth() {
  const session = useAuthStore((state) => state.session);
  return { isLoggedIn: Boolean(session?.accessToken), employee: session, logout };
}
