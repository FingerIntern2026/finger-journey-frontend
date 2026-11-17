// 역할: 선택한 입사자의 가방싸기 체크리스트를 보여주고, HR이 항목을 확인한다.
//       상태: NOT_STARTED(입사자가 아직 시작 전) / IN_PROGRESS(확인 대기) / COMPLETED(확인 완료, 되돌릴 수 없음)
//       시작 전·확인 대기 항목을 누르면 onToggle이 안내 또는 확인을 고른다. (AdminHrManagement에서 결정)
// 사용처: ADM_HRC_P01
// 담당자: 김재웅

import { Check } from "lucide-react";
import styles from "./HrChecklist.module.css";

const STATUS_HINTS = {
  NOT_STARTED: "시작 전",
  IN_PROGRESS: "확인 대기",
  COMPLETED: "확인 완료",
};

export default function HrChecklist({ employeeName, items, onToggle }) {
  return (
    <section className={styles.section} aria-label={`${employeeName} HR 체크리스트`}>
      {items.map((item) => {
        const isCompleted = item.status === "COMPLETED";

        return (
          <label
            className={`${styles.row} ${item.status === "NOT_STARTED" ? styles.notStarted : ""} ${isCompleted ? styles.locked : ""}`}
            key={item.checkTypeId}
          >
            <input type="checkbox" checked={isCompleted} disabled={isCompleted} onChange={() => onToggle(item)} />
            <span className={styles.checkbox} aria-hidden="true">
              {isCompleted && <Check size={14} strokeWidth={3} />}
            </span>
            <span className={styles.name}>{item.checkName}</span>
            <small className={styles.hint}>{STATUS_HINTS[item.status] ?? item.status}</small>
          </label>
        );
      })}
    </section>
  );
}
