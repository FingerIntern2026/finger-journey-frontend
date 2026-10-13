import AdminPageLayout from "../../common/AdminPageLayout";
import OnboardingProgressList from "./OnboardingProgressList";
import { ONBOARDING_PROGRESS } from "./progressData";
import styles from "./AdminProgress.module.css";

export default function AdminProgress({ onNavigate }) {
  return (
    <AdminPageLayout activeScreenCode="ADM_PRG_P01" onNavigate={onNavigate}>
      <main className={styles.content}>
        <h1>진행현황관리</h1>
        <OnboardingProgressList employees={ONBOARDING_PROGRESS} />
      </main>
    </AdminPageLayout>
  );
}
