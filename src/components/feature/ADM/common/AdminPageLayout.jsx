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

export default function AdminPageLayout({ activeScreenCode, onNavigate, onLogout = () => {}, children }) {
  return (
    <div className={styles.page}>
      <AdminHeader
        title={<span className={styles.brand}><Leaf size={22} aria-hidden="true" />핑거저니 관리자</span>}
        onLogout={onLogout}
      />
      {children}
      <BottomTabNav tabs={ADMIN_TABS} active={activeScreenCode} onChange={onNavigate} />
    </div>
  );
}
