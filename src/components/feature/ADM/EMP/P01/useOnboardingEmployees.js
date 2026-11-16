// 역할: 입사자 관리 화면에 필요한 서버 데이터(사원 목록, 조직·직급 선택지)를 불러오고
//       등록·수정·삭제 뒤에는 목록을 다시 불러온다.
// 사용처: AdminEmployeeManagement.jsx
// 담당자: 김재웅

import { useCallback, useEffect, useState } from "react";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployeeDetail,
  fetchEmployees,
  fetchOrganizations,
  fetchPositions,
  updateEmployee,
} from "../../../../../api/adminApi";
import { parseApiError } from "../../../../../utils/apiErrorUtils";

export default function useOnboardingEmployees() {
  const [employees, setEmployees] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const reload = useCallback(async () => {
    setEmployees(await fetchEmployees());
  }, []);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchEmployees(), fetchOrganizations(), fetchPositions()])
      .then(([employeeList, organizationList, positionList]) => {
        if (cancelled) return;
        setEmployees(employeeList);
        setOrganizations(organizationList);
        setPositions(positionList);
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

  // 등록: 성공하면 undefined, 실패하면 폼에 보여줄 오류 문구를 돌려준다.
  const create = async (values) => {
    try {
      await createEmployee({
        employeeNo: values.employeeNo.trim(),
        name: values.name.trim(),
        organizationId: Number(values.organizationId),
        positionId: Number(values.positionId),
        hireDate: values.hireDate,
        birthDate: values.birthDate,
      });
      await reload();
      return undefined;
    } catch (err) {
      return parseApiError(err).message;
    }
  };

  // 수정: 사번은 바꿀 수 없고, 생년월일을 비워두면 기존 값을 유지한다.
  const update = async (employeeId, values) => {
    try {
      await updateEmployee({
        employeeId,
        name: values.name.trim(),
        organizationId: Number(values.organizationId),
        positionId: Number(values.positionId),
        hireDate: values.hireDate,
        birthDate: values.birthDate || undefined,
      });
      await reload();
      return undefined;
    } catch (err) {
      return parseApiError(err).message;
    }
  };

  const remove = async (employeeId) => {
    setErrorMessage("");
    try {
      await deleteEmployee(employeeId);
      await reload();
    } catch (err) {
      setErrorMessage(parseApiError(err).message);
    }
  };

  // 수정 폼의 초기값: 목록에는 입사일이 없어서 상세 조회로 가져온다.
  // 상세 응답은 조직·직급을 이름으로 주므로 선택지에서 같은 이름의 id를 찾는다.
  const loadFormValues = async (employeeId) => {
    const detail = await fetchEmployeeDetail(employeeId);
    const organization = organizations.find((item) => item.organizationName === detail.organizationName);
    const position = positions.find((item) => item.positionName === detail.positionName);

    return {
      employeeNo: detail.employeeNo,
      name: detail.name,
      organizationId: organization ? String(organization.organizationId) : "",
      positionId: position ? String(position.positionId) : "",
      hireDate: detail.hireDate,
      birthDate: "",
    };
  };

  return {
    employees,
    organizations,
    positions,
    isLoaded,
    errorMessage,
    setErrorMessage,
    create,
    update,
    remove,
    loadFormValues,
  };
}
