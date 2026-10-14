import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import BaseButton from "../../../../common/base/BaseButton";
import BaseSelect from "../../../../common/base/BaseSelect";
import CustomSearchbar from "../../../../common/custom/CustomSearchbar";
import DialogFormPopup from "../../../../common/dialog/DialogFormPopup";
import { useDialog } from "../../../../../hooks/useDialog";
import { checkDuplicateEmployeeNoUtils } from "../../../../../utils/checkDuplicateEmployeeNoUtils.js";
import AdminPageLayout from "../../common/AdminPageLayout";
import ExistingEmployeeTable from "./ExistingEmployeeTable";
import OnboardingEmployeeCard from "./OnboardingEmployeeCard";
import { EMPLOYEE_FORM_FIELDS, EXISTING_EMPLOYEES, ONBOARDING_EMPLOYEES } from "./employeeManagementData";
import styles from "./AdminEmployeeManagement.module.css";

export default function AdminEmployeeManagement({ onNavigate }) {
  const { showConfirm, showDialog } = useDialog();
  const [onboardingEmployees, setOnboardingEmployees] = useState(ONBOARDING_EMPLOYEES);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const filteredEmployees = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return EXISTING_EMPLOYEES.filter((employee) => {
      const matchesKeyword = !normalizedKeyword
        || employee.name.toLowerCase().includes(normalizedKeyword)
        || employee.employeeNo.toLowerCase().includes(normalizedKeyword);
      const matchesStatus = status === "all" || employee.status === status;
      return matchesKeyword && matchesStatus;
    });
  }, [keyword, status]);

  const openEmployeeForm = (employee = null) => {
    const isEdit = Boolean(employee);

    showDialog("bottom", ({ close }) => (
      <DialogFormPopup
        title={isEdit ? "정보 수정" : "입사자 등록"}
        fields={EMPLOYEE_FORM_FIELDS}
        initialValues={employee ?? {}}
        onCancel={() => close(false)}
        onSubmit={(values) => {
          const employeesExceptEdited = onboardingEmployees.filter((item) => item.id !== employee?.id);
          const duplicate = checkDuplicateEmployeeNoUtils(values.employeeNo, [
            ...employeesExceptEdited,
            ...EXISTING_EMPLOYEES,
          ]);

          if (duplicate) return "이미 사용 중인 사번입니다.";

          if (isEdit) {
            setOnboardingEmployees((employees) => employees.map((item) => (
              item.id === employee.id ? { ...item, ...values } : item
            )));
          } else {
            setOnboardingEmployees((employees) => [
              ...employees,
              { ...values, id: Date.now(), progress: 0 },
            ]);
          }

          close(true);
          return undefined;
        }}
      />
    ));
  };

  const handleDelete = (employee) => {
    showConfirm(`${employee.name}님을 삭제할까요?`, () => {
      setOnboardingEmployees((employees) => employees.filter((item) => item.id !== employee.id));
    }, {
      confirmLabel: "저장",
      cancelLabel: "취소",
      messageClassName: styles.deleteMessage,
    });
  };

  return (
    <AdminPageLayout activeScreenCode="ADM_EMP_P01" onNavigate={onNavigate}>
      <main className={styles.content}>
        <section aria-labelledby="onboarding-title">
          <div className={styles.sectionHeader}>
            <h1 id="onboarding-title">입사자 관리</h1>
            <BaseButton
              label={<><Plus size={13} aria-hidden="true" />신규 등록</>}
              variant="secondary"
              className={styles.addButton}
              onClick={() => openEmployeeForm()}
            />
          </div>

          <div className={styles.onboardingList}>
            {onboardingEmployees.map((employee) => (
              <OnboardingEmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={() => openEmployeeForm(employee)}
                onDelete={() => handleDelete(employee)}
              />
            ))}
          </div>
        </section>

        <section className={styles.employeeSection} aria-labelledby="employee-list-title">
          <div className={styles.listHeading}>
            <h2 id="employee-list-title">기존 사원 목록</h2>
            <span>총 300명</span>
          </div>

          <div className={styles.filters}>
            <CustomSearchbar
              value={keyword}
              onChange={(value) => {
                setKeyword(value);
                setPage(1);
              }}
              placeholder="이름 또는 사번 검색"
              className={styles.searchbar}
            />
            <BaseSelect
              aria-label="재직 상태"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              options={[
                { value: "all", label: "전체" },
                { value: "재직", label: "재직" },
                { value: "휴직", label: "휴직" },
              ]}
              className={styles.statusSelect}
            />
          </div>

          <ExistingEmployeeTable employees={filteredEmployees} page={page} pageCount={3} onPageChange={setPage} />
        </section>
      </main>
    </AdminPageLayout>
  );
}
