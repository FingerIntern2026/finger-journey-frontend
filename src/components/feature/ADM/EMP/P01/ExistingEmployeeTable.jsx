// 역할: 서버의 사원 목록을 검색·필터한 결과를 5명씩 나눠 보여주는 표. 페이지 계산(몇 쪽인지, 현재 쪽의 사원)은 여기서 한다.
// 사용처: ADM_EMP_P01
// 담당자: 김재웅

import { ChevronLeft, ChevronRight } from "lucide-react";
import BaseBadge from "../../../../common/base/BaseBadge";
import { phaseLabel } from "../../common/adminLabels";
import styles from "./ExistingEmployeeTable.module.css";

const PAGE_SIZE = 5;

export default function ExistingEmployeeTable({ employees, page, onPageChange }) {
  const pageCount = Math.max(1, Math.ceil(employees.length / PAGE_SIZE));
  // 검색·필터로 목록이 줄어서 현재 쪽이 없어졌다면 마지막 쪽을 보여준다.
  const currentPage = Math.min(page, pageCount);
  const pageEmployees = employees.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
              <th>단계</th>
            </tr>
          </thead>
          <tbody>
            {pageEmployees.length > 0 ? pageEmployees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>
                  <span className={styles.nameCell}>
                    <span aria-hidden="true">{employee.name.slice(0, 1)}</span>
                    <strong>{employee.name}</strong>
                  </span>
                </td>
                <td>{employee.employeeNo}</td>
                <td>{employee.organizationName}</td>
                <td>{employee.positionName}</td>
                <td>
                  <BaseBadge
                    label={phaseLabel(employee.currentPhase)}
                    color={employee.currentPhase === "COMPLETED" ? "green" : "gray"}
                    className={styles.statusBadge}
                  />
                </td>
              </tr>
            )) : (
              <tr>
                <td className={styles.empty} colSpan={5}>검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav className={styles.pagination} aria-label="기존 사원 목록 페이지">
        <button type="button" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} aria-label="이전 페이지">
          <ChevronLeft size={12} />
        </button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={pageNumber === currentPage ? styles.activePage : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button type="button" onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))} disabled={currentPage === pageCount} aria-label="다음 페이지">
          <ChevronRight size={12} />
        </button>
      </nav>
    </>
  );
}
