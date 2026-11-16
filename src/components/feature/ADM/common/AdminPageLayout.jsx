import { useState } from 'react';
import { logout } from '../../../../services/authService';
import useNavigation from '../../../../hooks/useNavigation';
import { Leaf } from "lucide-react";
import AdminHeader from "../../../common/layout/AdminHeader";
import BottomTabNav from "../../../common/layout/BottomTabNav";
import styles from "./AdminPageLayout.module.css";

const ADMIN_TABS = [
  { path: "ADM_EMP_P01", label: "입사자", icon: "user" },
  { path: "ADM_WIK_P01", label: "위키관리", icon: "wiki" },
  { path: "ADM_PRG_P01", label: "진행현황", icon: "progress" },
  { path: "ADM_HRC_P01", label: "HR확인", icon: "bell" },
];

export default function AdminPageLayout({ activeScreenCode, onNavigate, onLogout, children }) {
  const { goForward } = useNavigation();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const handleLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await logout();
      goForward('PB_LGN_P01', {}, { clearHistory: true });
      onLogout?.();
    } catch {
      setError('서버 로그아웃에 실패했습니다. 다시 로그인 후 시도해주세요.');
      goForward('PB_LGN_P01', {}, { clearHistory: true });
    } finally { setBusy(false); }
  };
  return (
    <div className={styles.page}>
      <AdminHeader
        title={<span className={styles.brand}><Leaf size={22} aria-hidden="true" />핑거저니 관리자</span>}
        onLogout={handleLogout}
      />
      {error && <p role="alert">{error}</p>}
      {children}
      <BottomTabNav tabs={ADMIN_TABS} active={activeScreenCode} onChange={onNavigate} />
    </div>
  );
}
