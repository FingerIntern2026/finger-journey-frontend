import { useState } from "react";
import BaseButton from "../../../../common/base/BaseButton";
import BaseInput from "../../../../common/base/BaseInput";
import AdminPageLayout from "../../common/AdminPageLayout";
import HrChecklist from "./HrChecklist";
import { EMPLOYEES, INITIAL_CHECKLIST } from "./hrManagementData";
import styles from "./AdminHrManagement.module.css";

export default function AdminHrManagement({ onNavigate }) {
  const [selectedEmployee, setSelectedEmployee] = useState(EMPLOYEES[0]);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [password, setPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const toggleChecklist = (id) => {
    setChecklist((previous) => previous.map((item) => (
      item.id === id ? { ...item, checked: !item.checked } : item
    )));
  };

  const savePassword = () => {
    setSavedMessage(password.trim() ? "체크인 비밀번호를 저장했습니다." : "비밀번호를 입력해주세요.");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setSavedMessage("");
  };

  return (
    <AdminPageLayout activeScreenCode="ADM_HRC_P01" onNavigate={onNavigate}>
      <main className={styles.content}>
        <h1>HR관리</h1>
        <div className={styles.employeeTabs} aria-label="입사자 선택">
          {EMPLOYEES.map((employee) => (
            <button
              key={employee}
              type="button"
              className={selectedEmployee === employee ? styles.activeEmployee : ""}
              onClick={() => setSelectedEmployee(employee)}
            >
              {employee}
            </button>
          ))}
        </div>

        <HrChecklist employeeName={selectedEmployee} items={checklist} onToggle={toggleChecklist} />

        <section className={styles.passwordSection} aria-labelledby="checkin-password-title">
          <h2 id="checkin-password-title">체크인 비밀번호 설정</h2>
          <div className={styles.passwordRow}>
            <BaseInput
              type="password"
              aria-label="체크인 비밀번호"
              placeholder="설정할 비밀번호를 입력하세요"
              value={password}
              onChange={handlePasswordChange}
              className={styles.passwordInput}
            />
            <BaseButton label="저장" onClick={savePassword} className={styles.saveButton} />
          </div>
          {savedMessage && <p className={styles.savedMessage}>{savedMessage}</p>}
        </section>
      </main>
    </AdminPageLayout>
  );
}
