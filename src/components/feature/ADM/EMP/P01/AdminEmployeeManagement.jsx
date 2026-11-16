import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import BaseButton from "../../../../common/base/BaseButton";
import BaseSelect from "../../../../common/base/BaseSelect";
import CustomSearchbar from "../../../../common/custom/CustomSearchbar";
import DialogFormPopup from "../../../../common/dialog/DialogFormPopup";
import { useDialog } from "../../../../../hooks/useDialog";
import { parseApiError } from "../../../../../utils/apiErrorUtils";
import AdminPageLayout from "../../common/AdminPageLayout";
import ExistingEmployeeTable from "./ExistingEmployeeTable";
import OnboardingEmployeeCard from "./OnboardingEmployeeCard";
import { buildEmployeeFormFields, EXISTING_EMPLOYEES } from "./employeeManagementData";
import useOnboardingEmployees from "./useOnboardingEmployees";
import styles from "./AdminEmployeeManagement.module.css";

export default function AdminEmployeeManagement({ onNavigate }) {
  const { showConfirm, showDialog } = useDialog();
  const {
    employees: onboardingEmployees,
    organizations,
    positions,
    isLoaded,
    errorMessage,
    setErrorMessage,
    create,
    update,
    remove,
    loadFormValues,
  } = useOnboardingEmployees();
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

  const openEmployeeForm = async (employee = null) => {
    const isEdit = Boolean(employee);
    setErrorMessage("");

    let initialValues = {};
    if (isEdit) {
      try {
        initialValues = await loadFormValues(employee.employeeId);
      } catch (err) {
        setErrorMessage(parseApiError(err).message);
        return;
      }
    }

    showDialog("bottom", ({ close }) => (
      <DialogFormPopup
        title={isEdit ? "정보 수정" : "입사자 등록"}
        fields={buildEmployeeFormFields({ isEdit, organizations, positions })}
        initialValues={initialValues}
        onCancel={() => close(false)}
        onSubmit={async (values) => {
          // 서버가 사번 중복(ADM_003) 등을 검사해서 오류 문구를 돌려주면 폼 안에 그대로 보여준다.
          const error = isEdit ? await update(employee.employeeId, values) : await create(values);
          if (error) return error;

          close(true);
          return undefined;
        }}
      />
    ));
  };

  const handleDelete = (employee) => {
    showConfirm(`${employee.name}님을 삭제할까요?`, () => {
      remove(employee.employeeId);
    }, {
      confirmLabel: "삭제",
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

          {errorMessage && <p role="alert">{errorMessage}</p>}
          {isLoaded && !errorMessage && onboardingEmployees.length === 0 && <p>등록된 입사자가 없어요.</p>}

          <div className={styles.onboardingList}>
            {onboardingEmployees.map((employee) => (
              <OnboardingEmployeeCard
                key={employee.employeeId}
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
