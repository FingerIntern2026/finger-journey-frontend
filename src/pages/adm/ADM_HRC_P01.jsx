import { useState } from "react";
import { Leaf } from "lucide-react";
import BaseButton from "../../components/common/base/BaseButton";
import BaseInput from "../../components/common/base/BaseInput";
import AdminHeader from "../../components/common/layout/AdminHeader";
import BottomTabNav from "../../components/common/layout/BottomTabNav";
import HrChecklist from "../../components/feature/ADM/HRC/P01/HrChecklist";
import useNavigationStore from "../../stores/useNavigationStore";
import styles from "./ADM_HRC_P01.module.css";

const ADMIN_TABS = [
  { path: "ADM_EMP_P01", label: "입사자", icon: "user" },
  { path: "ADM_WIK_P01", label: "위키관리", icon: "wiki" },
  { path: "ADM_PRG_P01", label: "진행현황", icon: "progress" },
  { path: "ADM_HRC_P01", label: "HR확인", icon: "bell" },
];

const EMPLOYEES = ["김핑거", "이핑거", "박핑거"];

const INITIAL_CHECKLIST = [
  { id: "documents", label: "서류 제출", checked: true },
  { id: "equipment", label: "업무 장비 확인", checked: false },
  { id: "account", label: "계정 발급 확인", checked: false },
  { id: "contract", label: "계약서 작성", checked: false },
  { id: "seat", label: "좌석 배정 확인", checked: false },
];

export default function ADM_HRC_P01({ preview = false }) {
  const goForward = useNavigationStore((state) => state.goForward);
  const [selectedEmployee, setSelectedEmployee] = useState(EMPLOYEES[0]);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [password, setPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const toggleChecklist = (id) => {
    setChecklist((previous) => previous.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const savePassword = () => {
    setSavedMessage(password.trim() ? "체크인 비밀번호를 저장했습니다." : "비밀번호를 입력해주세요.");
  };

  return (
    <div className={`${styles.page} ${preview ? styles.previewPage : ""}`}>
      <AdminHeader title={<span className={styles.brand}><Leaf size={22} aria-hidden="true" />핑거저니 관리자</span>} onLogout={() => {}} />
      <main className={styles.content}>
        <h1>HR관리</h1>
        <div className={styles.employeeTabs} aria-label="입사자 선택">
          {EMPLOYEES.map((employee) => (
            <button key={employee} type="button" className={selectedEmployee === employee ? styles.activeEmployee : ""} onClick={() => setSelectedEmployee(employee)}>
              {employee}
            </button>
          ))}
        </div>
        <HrChecklist employeeName={selectedEmployee} items={checklist} onToggle={toggleChecklist} />
        <section className={styles.passwordSection} aria-labelledby="checkin-password-title">
          <h2 id="checkin-password-title">체크인 비밀번호 설정</h2>
          <div className={styles.passwordRow}>
            <BaseInput type="password" aria-label="체크인 비밀번호" placeholder="설정할 비밀번호를 입력하세요" value={password} onChange={(event) => { setPassword(event.target.value); setSavedMessage(""); }} className={styles.passwordInput} />
            <BaseButton label="저장" onClick={savePassword} className={styles.saveButton} />
          </div>
          {savedMessage && <p className={styles.savedMessage}>{savedMessage}</p>}
        </section>
      </main>
      <BottomTabNav tabs={ADMIN_TABS} active="ADM_HRC_P01" onChange={(screenCode) => { if (!preview) goForward(screenCode); }} />
    </div>
  );
}
