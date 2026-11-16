import { useEffect, useState } from "react";
import { fetchProgress } from "../../../../../api/adminApi";
import { parseApiError } from "../../../../../utils/apiErrorUtils";
import AdminPageLayout from "../../common/AdminPageLayout";
import OnboardingProgressList from "./OnboardingProgressList";
import styles from "./AdminProgress.module.css";

export default function AdminProgress({ onNavigate }) {
  const [employees, setEmployees] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchProgress()
      .then((data) => {
        if (!cancelled) setEmployees(data);
      })
      .catch((err) => {
        if (!cancelled) setErrorMessage(parseApiError(err).message);
      })
      .finally(() => {
        if (!cancelled) setIsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdminPageLayout activeScreenCode="ADM_PRG_P01" onNavigate={onNavigate}>
      <main className={styles.content}>
        <h1>진행현황관리</h1>
        {errorMessage && <p role="alert">{errorMessage}</p>}
        {isLoaded && !errorMessage && employees.length === 0 && <p>진행 중인 입사자가 없어요.</p>}
        <OnboardingProgressList employees={employees} />
      </main>
    </AdminPageLayout>
  );
}
