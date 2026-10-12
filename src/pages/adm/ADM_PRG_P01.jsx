import { Leaf } from "lucide-react";
import AdminHeader from "../../components/common/layout/AdminHeader";
import BottomTabNav from "../../components/common/layout/BottomTabNav";
import OnboardingProgressList from "../../components/feature/ADM/PRG/P01/OnboardingProgressList";
import useNavigationStore from "../../stores/useNavigationStore";
import styles from "./ADM_PRG_P01.module.css";

const ADMIN_TABS = [
  { path: "ADM_EMP_P01", label: "입사자", icon: "user" },
  { path: "ADM_WIK_P01", label: "위키관리", icon: "wiki" },
  { path: "ADM_PRG_P01", label: "진행현황", icon: "progress" },
  { path: "ADM_HRC_P01", label: "HR확인", icon: "bell" },
];

const EMPLOYEES = [
  {
    id: "kim",
    name: "김핑거",
    department: "Platform 1본부 개발 1팀",
    currentStage: 1,
    totalStage: 10,
    stages: ["핑거이야기", "직원들과 인사주고받기", "회의생활", "문제해결", "이해", "기업별 맞춤카드", "ERP 지식", "마이패스", "포레스트", "레벨업"],
  },
  {
    id: "lee",
    name: "이핑거",
    department: "Platform 1본부 개발 2팀",
    currentStage: 7,
    totalStage: 10,
    stages: ["핑거이야기", "직원들과 인사주고받기", "회의생활", "문제해결", "이해", "기업별 맞춤카드", "ERP 지식", "마이패스", "포레스트", "레벨업"],
  },
];

export default function ADM_PRG_P01({ preview = false }) {
  const goForward = useNavigationStore((state) => state.goForward);

  return (
    <div className={`${styles.page} ${preview ? styles.previewPage : ""}`}>
      <AdminHeader
        title={<span className={styles.brand}><Leaf size={22} aria-hidden="true" />핑거저니 관리자</span>}
        onLogout={() => {}}
      />
      <main className={styles.content}>
        <h1>진행현황관리</h1>
        <OnboardingProgressList employees={EMPLOYEES} />
      </main>
      <BottomTabNav
        tabs={ADMIN_TABS}
        active="ADM_PRG_P01"
        onChange={(screenCode) => {
          if (!preview) goForward(screenCode);
        }}
      />
    </div>
  );
}
