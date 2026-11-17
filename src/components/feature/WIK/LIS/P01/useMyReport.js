// 역할: 로그인한 사용자의 AI 완주 리포트가 이미 있는지 서버에서 확인한다.
//       "loading"(확인 중) / "exists"(있음) / "none"(없음, 또는 확인 실패) 중 하나를 돌려준다.
//       리포트가 없을 때 서버가 주는 오류(CPL_004)는 오류가 아니라 "없음"으로 취급한다.
// 사용처: WIK_LIS_P01.jsx
// 담당자: 김재웅

import { useEffect, useState } from "react";
import { fetchReportDetail } from "../../../../../api/reportApi";
import useAuthStore from "../../../../../stores/authStore";

export default function useMyReport() {
  const employeeId = useAuthStore((state) => state.session?.employeeId);
  const [status, setStatus] = useState(employeeId ? "loading" : "none");

  useEffect(() => {
    if (!employeeId) return undefined;
    let cancelled = false;

    fetchReportDetail(employeeId)
      .then(() => {
        if (!cancelled) setStatus("exists");
      })
      .catch(() => {
        if (!cancelled) setStatus("none");
      });

    return () => {
      cancelled = true;
    };
  }, [employeeId]);

  return status;
}
