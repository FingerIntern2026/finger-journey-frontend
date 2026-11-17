// 역할: 체크인(가방싸기) 항목의 "HR 확인 전에는 다음으로 못 넘어가기"를 담당한다.
//       - 항목의 첫 화면에 들어오면 서버에 진입을 알린다. (HR 화면에 "확인 대기"로 보이기 시작함)
//       - "다음"을 누르면 서버에서 HR 확인 여부를 보고, 확인됐을 때만 다음 화면으로 간다.
//         아직이면 안내를 보여주고 3초마다 확인해서, HR이 확인하는 순간 자동으로 넘어간다.
// 항목은 서버가 정한 표시 순서(displayOrder)로 찾는다. (1 서류, 2 장비, 3 계정, 4 계약서, 5 좌석)
// 사용처: CHK_DOC_P01, CHK_EQU_P01, CHK_ACC_P01/P02, CHK_APR_P01/P03, CHK_SEA_P01
// 담당자: 김재웅

import { useCallback, useEffect, useRef, useState } from "react";
import { enterBagItem, fetchBagList, fetchBagStatus } from "../api/bagApi";
import { parseApiError } from "../utils/apiErrorUtils";

const POLL_INTERVAL_MS = 3000;

async function findCheckTypeId(order) {
  const items = await fetchBagList();
  const item = items.find((candidate) => candidate.displayOrder === order);
  if (!item) throw new Error("체크인 항목 정보를 찾을 수 없어요.");
  return item.checkTypeId;
}

export default function useBagGate(order) {
  const [waiting, setWaiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const timer = useRef(null);

  const stopPolling = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  // 화면에 들어오면 항목에 진입한다. (이미 진입했거나 끝난 항목이어도 서버가 상태를 그대로 둔다)
  useEffect(() => {
    let cancelled = false;

    findCheckTypeId(order)
      .then((checkTypeId) => enterBagItem(checkTypeId))
      .catch((err) => {
        if (!cancelled) setErrorMessage(parseApiError(err).message);
      });

    return () => {
      cancelled = true;
      stopPolling();
    };
  }, [order, stopPolling]);

  const isConfirmed = useCallback(async () => {
    const [checkTypeId, statuses] = await Promise.all([findCheckTypeId(order), fetchBagStatus()]);
    return statuses.find((item) => item.checkTypeId === checkTypeId)?.status === "COMPLETED";
  }, [order]);

  // "다음" 버튼: HR이 확인했으면 goNext를 부르고, 아니면 확인될 때까지 기다린다.
  const requestNext = useCallback(async (goNext) => {
    if (timer.current) return;
    setErrorMessage("");

    try {
      if (await isConfirmed()) {
        goNext();
        return;
      }
    } catch (err) {
      setErrorMessage(parseApiError(err).message);
      return;
    }

    setWaiting(true);
    timer.current = setInterval(async () => {
      try {
        if (await isConfirmed()) {
          stopPolling();
          setWaiting(false);
          goNext();
        }
      } catch {
        // 일시적인 오류는 다음 확인 때 다시 시도한다.
      }
    }, POLL_INTERVAL_MS);
  }, [isConfirmed, stopPolling]);

  return { waiting, errorMessage, requestNext };
}
