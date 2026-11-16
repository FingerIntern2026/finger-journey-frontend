import useAuthStore from '../stores/authStore';

export function getIsLoggedIn() {
  return Boolean(useAuthStore.getState().session?.accessToken);
}
export function setIsLoggedIn(nextValue) {
  if (!nextValue) useAuthStore.getState().setSession(null);
}
