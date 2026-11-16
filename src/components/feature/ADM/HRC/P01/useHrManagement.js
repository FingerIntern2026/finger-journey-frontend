// 역할: HR확인 화면에 필요한 서버 데이터를 불러온다.
//       - 입사자 탭: 사원 목록
//       - 체크리스트: 선택한 입사자의 가방싸기 항목별 상태, 확인 처리 후 그 항목만 갱신
// 사용처: AdminHrManagement.jsx
// 담당자: 김재웅

import { useEffect, useState } from "react";
import { confirmBagCheck, fetchBagChecklist, fetchEmployees } from "../../../../../api/adminApi";
import { parseApiError } from "../../../../../utils/apiErrorUtils";

export default function useHrManagement() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  // 어느 입사자의 체크리스트인지 함께 기억해서, 탭을 바꾼 직후 이전 사람 목록이 잠깐 보이지 않게 한다.
  const [checklist, setChecklist] = useState({ employeeId: null, items: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchEmployees()
      .then((data) => {
        if (cancelled) return;
        setEmployees(data);
        setSelectedEmployeeId(data[0]?.employeeId ?? null);
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

  // 입사자 탭을 바꿀 때마다 그 사람의 체크리스트를 다시 불러온다.
  useEffect(() => {
    if (selectedEmployeeId === null) return undefined;
    let cancelled = false;

    fetchBagChecklist(selectedEmployeeId)
      .then((data) => {
        if (!cancelled) setChecklist({ employeeId: selectedEmployeeId, items: data });
      })
      .catch((err) => {
        if (!cancelled) setErrorMessage(parseApiError(err).message);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedEmployeeId]);

  const selectEmployee = (employeeId) => {
    setErrorMessage("");
    setSelectedEmployeeId(employeeId);
  };

  // 확인 처리는 서버가 돌려준 상태(COMPLETED)와 확인 시각으로 해당 항목만 바꾼다.
  const confirm = async (checkTypeId) => {
    const employeeId = selectedEmployeeId;
    setErrorMessage("");

    try {
      const result = await confirmBagCheck(employeeId, checkTypeId);
      // 확인 요청 중에 다른 입사자 탭으로 옮겼다면 화면을 건드리지 않는다.
      setChecklist((previous) => (
        previous.employeeId !== employeeId ? previous : {
          ...previous,
          items: previous.items.map((item) => (
            item.checkTypeId === checkTypeId
              ? { ...item, status: result.status, checkedAt: result.checkedAt }
              : item
          )),
        }
      ));
    } catch (err) {
      setErrorMessage(parseApiError(err).message);
    }
  };

  return {
    employees,
    selectedEmployeeId,
    checklist: checklist.employeeId === selectedEmployeeId ? checklist.items : [],
    isLoaded,
    errorMessage,
    selectEmployee,
    confirm,
  };
}
