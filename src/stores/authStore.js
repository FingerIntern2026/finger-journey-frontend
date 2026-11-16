import { create } from 'zustand';

const KEY = 'fingerJourney.auth';
function readSession() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? null; }
  catch { return null; }
}
const useAuthStore = create((set) => ({
  session: readSession(),
  setSession: (session) => {
    if (session) localStorage.setItem(KEY, JSON.stringify(session));
    else localStorage.removeItem(KEY);
    localStorage.removeItem('isLoggedIn');
    set({ session });
  },
}));
export default useAuthStore;
