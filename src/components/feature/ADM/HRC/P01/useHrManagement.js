// 역할: HR확인 화면에 필요한 서버 데이터를 불러온다.
//       - 입사자 탭: 사원 목록
//       - 체크리스트: 선택한 입사자의 가방싸기 항목별 상태.
//         입사자가 체크인 화면에 들어오면 서버 상태가 바뀌므로, 3초마다 다시 불러와 화면에 바로 반영한다.
//       - 확인 처리(IN_PROGRESS -> COMPLETED)와 확인 취소(COMPLETED -> IN_PROGRESS)
// 사용처: AdminHrManagement.jsx
// 담당자: 김재웅

import { useCallback, useEffect, useRef, useState } from "react";
import { cancelBagCheck, confirmBagCheck, fetchBagChecklist, fetchEmployees } from "../../../../../api/adminApi";
import { parseApiError } from "../../../../../utils/apiErrorUtils";

const POLL_INTERVAL_MS = 3000;

export default function useHrManagement() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  // 어느 입사자의 체크리스트인지 함께 기억해서, 탭을 바꾼 직후 이전 사람 목록이 잠깐 보이지 않게 한다.
  const [checklist, setChecklist] = useState({ employeeId: null, items: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [noticeMessage, setNoticeMessage] = useState("");
  // 확인/취소 요청 중에는 주기적으로 불러온 값이 방금 바꾼 상태를 덮어쓰지 않게 잠시 건너뛴다.
  const busy = useRef(false);

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

  // 선택한 입사자의 체크리스트를 바로 한 번, 이후 3초마다 불러온다. 탭을 바꾸면 새 입사자로 다시 시작한다.
  useEffect(() => {
    if (selectedEmployeeId === null) return undefined;
    let cancelled = false;

    const load = () => {
      if (busy.current) return;
      fetchBagChecklist(selectedEmployeeId)
        .then((data) => {
          if (!cancelled && !busy.current) setChecklist({ employeeId: selectedEmployeeId, items: data });
        })
        .catch((err) => {
          if (!cancelled) setErrorMessage(parseApiError(err).message);
        });
    };

    load();
    const timer = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [selectedEmployeeId]);

  const selectEmployee = (employeeId) => {
    setErrorMessage("");
    setNoticeMessage("");
    setSelectedEmployeeId(employeeId);
  };

  // 서버가 돌려준 상태로 해당 항목만 바꾼다. 요청 중에 다른 입사자 탭으로 옮겼다면 화면을 건드리지 않는다.
  const applyResult = useCallback((employeeId, checkTypeId, result) => {
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
  }, []);

  const runAction = async (request, checkTypeId) => {
    const employeeId = selectedEmployeeId;
    setErrorMessage("");
    setNoticeMessage("");
    busy.current = true;

    try {
      applyResult(employeeId, checkTypeId, await request(employeeId, checkTypeId));
    } catch (err) {
      setErrorMessage(parseApiError(err).message);
    } finally {
      busy.current = false;
    }
  };

  const confirm = (checkTypeId) => runAction(confirmBagCheck, checkTypeId);
  const cancel = (checkTypeId) => runAction(cancelBagCheck, checkTypeId);

  // 입사자가 아직 들어오지 않은 항목은 확인할 수 없다는 안내
  const notifyNotStarted = (employeeName, checkName) => {
    setErrorMessage("");
    setNoticeMessage(`${employeeName}님이 아직 '${checkName}' 단계에 들어오지 않았어요. 들어오면 확인할 수 있어요.`);
  };

  return {
    employees,
    selectedEmployeeId,
    checklist: checklist.employeeId === selectedEmployeeId ? checklist.items : [],
    isLoaded,
    errorMessage,
    noticeMessage,
    selectEmployee,
    confirm,
    cancel,
    notifyNotStarted,
  };
}
