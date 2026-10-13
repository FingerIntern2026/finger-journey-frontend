// 역할: 입사 예정 사원과 기존 사원을 통합 관리하는 관리자 메인 화면.
// 사용처: 화면 코드 ADM_EMP_P01
// 담당자: 김재웅

import { useMemo, useState } from "react";
import { Leaf, Plus } from "lucide-react";
import BaseButton from "../../components/common/base/BaseButton";
import BaseSelect from "../../components/common/base/BaseSelect";
import CustomSearchbar from "../../components/common/custom/CustomSearchbar";
import AdminHeader from "../../components/common/layout/AdminHeader";
import BottomTabNav from "../../components/common/layout/BottomTabNav";
import OnboardingEmployeeCard from "../../components/feature/ADM/EMP/P01/OnboardingEmployeeCard";
import ExistingEmployeeTable from "../../components/feature/ADM/EMP/P01/ExistingEmployeeTable";
import DialogFormPopup from "../../components/common/dialog/DialogFormPopup";
import { useDialog } from "../../hooks/useDialog";
import useNavigationStore from "../../stores/useNavigationStore";
import { checkDuplicateEmployeeNo } from "../../utils/checkDuplicateEmployeeNo";
import styles from "./ADM_EMP_P01.module.css";

const ADMIN_TABS = [
  { path: "ADM_EMP_P01", label: "입사자", icon: "user" },
  { path: "ADM_WIK_P01", label: "위키관리", icon: "wiki" },
  { path: "ADM_PRG_P01", label: "진행현황", icon: "progress" },
  { path: "ADM_HRC_P01", label: "HR확인", icon: "bell" },
];

const ONBOARDING_EMPLOYEES = [
  { id: 1, name: "김핑거", employeeNo: "FG2024001", department: "Common Tech Part", position: "인턴", joinDate: "2026-08-01", progress: 70 },
  { id: 2, name: "이핑거", employeeNo: "FG2024002", department: "Common Tech Part", position: "인턴", joinDate: "2026-08-01", progress: 40 },
  { id: 3, name: "박핑거", employeeNo: "FG2024003", department: "Common Tech Part", position: "인턴", joinDate: "2026-08-01", progress: 70 },
];

const EXISTING_EMPLOYEES = [
  { id: 1, name: "김핑거1", employeeNo: "FG20191000", department: "Common Tech", position: "사원", joinDate: "2019-01-01", status: "재직" },
  { id: 2, name: "이핑거2", employeeNo: "FG20201001", department: "Platform Part", position: "선임", joinDate: "2020-02-02", status: "재직" },
  { id: 3, name: "박핑거3", employeeNo: "FG20211102", department: "HR팀", position: "책임", joinDate: "2021-03-03", status: "휴직" },
  { id: 4, name: "최핑거4", employeeNo: "FG20221103", department: "Develop 1팀", position: "수석", joinDate: "2022-04-04", status: "재직" },
  { id: 5, name: "정핑거5", employeeNo: "FG20231104", department: "Develop 2팀", position: "팀장", joinDate: "2023-05-05", status: "재직" },
];

const EMPLOYEE_FORM_FIELDS = [
  { name: "employeeNo", label: "사번", placeholder: "12608002", required: true },
  { name: "name", label: "이름", placeholder: "박핑거", required: true },
  { name: "department", label: "부서/팀", placeholder: "Platform 1본부 개발 1팀", required: true },
  { name: "position", label: "직급", placeholder: "인턴", required: true },
  { name: "joinDate", label: "입사일", placeholder: "2026-08-01", required: true },
];

export default function ADM_EMP_P01() {
  const goForward = useNavigationStore((state) => state.goForward);
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

  const moveTo = (screenCode, params = {}) => {
    goForward(screenCode, params);
  };

  const openEmployeeForm = (employee = null) => {
    const isEdit = Boolean(employee);

    showDialog("bottom", ({ close }) => (
      <DialogFormPopup
        title={isEdit ? "정보 수정" : "입사자 등록"}
        fields={EMPLOYEE_FORM_FIELDS}
        // 신규 등록은 Figma의 회색 안내 문구를 placeholder로만 표시한다.
        // 수정일 때만 기존 값을 실제 입력값으로 채운다.
        initialValues={employee ?? {}}
        onCancel={() => close(false)}
        onSubmit={(values) => {
          const employeesExceptEdited = onboardingEmployees.filter((item) => item.id !== employee?.id);
          const duplicate = checkDuplicateEmployeeNo(values.employeeNo, [
            ...employeesExceptEdited,
            ...EXISTING_EMPLOYEES,
          ]);

          if (duplicate) {
            return "이미 사용 중인 사번입니다.";
          }

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
    <div className={styles.page}>
      <AdminHeader
        title={(
          <span className={styles.brand}>
            <Leaf size={22} aria-hidden="true" />
            핑거저니 관리자
          </span>
        )}
        onLogout={() => {}}
      />

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

          <ExistingEmployeeTable
            employees={filteredEmployees}
            page={page}
            pageCount={3}
            onPageChange={setPage}
          />
        </section>
      </main>

      <BottomTabNav
        tabs={ADMIN_TABS}
        active="ADM_EMP_P01"
        onChange={(screenCode) => moveTo(screenCode)}
      />
    </div>
  );
}
