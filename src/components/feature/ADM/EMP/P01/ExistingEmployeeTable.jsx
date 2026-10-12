import { ChevronLeft, ChevronRight } from "lucide-react";
import BaseBadge from "../../../../common/base/BaseBadge";
import styles from "./ExistingEmployeeTable.module.css";

export default function ExistingEmployeeTable({ employees, page, pageCount, onPageChange }) {
  return (
    <>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>이름</th>
              <th>사번</th>
              <th>부서</th>
              <th>직급</th>
              <th>입사일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <span className={styles.nameCell}>
                    <span aria-hidden="true">{employee.name.slice(0, 1)}</span>
                    <strong>{employee.name}</strong>
                  </span>
                </td>
                <td>{employee.employeeNo}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>{employee.joinDate}</td>
                <td>
                  <BaseBadge
                    label={employee.status}
                    color={employee.status === "재직" ? "green" : "gray"}
                    className={styles.statusBadge}
                  />
                </td>
              </tr>
            )) : (
              <tr>
                <td className={styles.empty} colSpan={6}>검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav className={styles.pagination} aria-label="기존 사원 목록 페이지">
        <button type="button" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1} aria-label="이전 페이지">
          <ChevronLeft size={12} />
        </button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={pageNumber === page ? styles.activePage : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button type="button" onClick={() => onPageChange(Math.min(pageCount, page + 1))} disabled={page === pageCount} aria-label="다음 페이지">
          <ChevronRight size={12} />
        </button>
      </nav>
    </>
  );
}
