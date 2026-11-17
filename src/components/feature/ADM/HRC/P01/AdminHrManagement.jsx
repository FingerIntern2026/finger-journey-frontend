import { useState } from "react";
import { updateCheckinPassword } from "../../../../../api/adminApi";
import { useDialog } from "../../../../../hooks/useDialog";
import useDragScroll from "../../../../../hooks/useDragScroll";
import { parseApiError } from "../../../../../utils/apiErrorUtils";
import BaseButton from "../../../../common/base/BaseButton";
import BaseInput from "../../../../common/base/BaseInput";
import AdminPageLayout from "../../common/AdminPageLayout";
import HrChecklist from "./HrChecklist";
import HrPoem from "./HrPoem";
import useHrManagement from "./useHrManagement";
import styles from "./AdminHrManagement.module.css";

export default function AdminHrManagement({ onNavigate }) {
  const {
    employees,
    selectedEmployeeId,
    checklist,
    isLoaded,
    errorMessage,
    noticeMessage,
    selectEmployee,
    confirm,
    cancel,
    notifyNotStarted,
  } = useHrManagement();
  const { showConfirm } = useDialog();
  const dragScroll = useDragScroll();
  const [password, setPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const selectedEmployee = employees.find((employee) => employee.employeeId === selectedEmployeeId);

  // 항목을 누르면: 시작 전이면 안내, 확인 대기면 확인, 확인 완료면 한 번 더 물어본 뒤 확인 취소
  const handleToggle = (item) => {
    if (item.status === "NOT_STARTED") {
      notifyNotStarted(selectedEmployee.name, item.checkName);
      return;
    }
    if (item.status === "IN_PROGRESS") {
      confirm(item.checkTypeId);
      return;
    }
    showConfirm(`'${item.checkName}' 확인을 취소할까요?`, () => cancel(item.checkTypeId), {
      confirmLabel: "확인 취소",
      cancelLabel: "닫기",
    });
  };

  const savePassword = async () => {
    if (!password.trim()) {
      setSavedMessage("비밀번호를 입력해주세요.");
      return;
    }

    try {
      await updateCheckinPassword(password);
      setSavedMessage("체크인 비밀번호를 저장했습니다.");
      setPassword("");
    } catch (err) {
      setSavedMessage(parseApiError(err).message);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setSavedMessage("");
  };

  return (
    <AdminPageLayout activeScreenCode="ADM_HRC_P01" onNavigate={onNavigate}>
      <main className={styles.content}>
        <h1>HR관리</h1>
        <div className={styles.employeeTabs} aria-label="입사자 선택" {...dragScroll}>
          {employees.map((employee) => (
            <button
              key={employee.employeeId}
              type="button"
              className={selectedEmployeeId === employee.employeeId ? styles.activeEmployee : ""}
              onClick={() => selectEmployee(employee.employeeId)}
            >
              {employee.name}
            </button>
          ))}
        </div>

        {errorMessage && <p role="alert">{errorMessage}</p>}
        {isLoaded && !errorMessage && !selectedEmployee && <p>등록된 입사자가 없어요.</p>}

        {selectedEmployee && (
          <>
            <HrPoem employee={{ id: selectedEmployee.employeeId, name: selectedEmployee.name }} />
            {noticeMessage && <p role="status" className={styles.noticeMessage}>{noticeMessage}</p>}
            <HrChecklist employeeName={selectedEmployee.name} items={checklist} onToggle={handleToggle} />
          </>
        )}

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
