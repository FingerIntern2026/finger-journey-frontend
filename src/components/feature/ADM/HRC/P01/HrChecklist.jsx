// 역할: 선택한 입사자의 HR 체크리스트와 체크인 비밀번호 설정 영역을 제공한다.
// 사용처: ADM_HRC_P01
// 담당자: 김재웅

import { Check } from "lucide-react";
import styles from "./HrChecklist.module.css";

export default function HrChecklist({ employeeName, items, onToggle }) {
  return (
    <section className={styles.section} aria-label={`${employeeName} HR 체크리스트`}>
      {items.map((item) => (
        <label className={styles.row} key={item.id}>
          <input type="checkbox" checked={item.checked} onChange={() => onToggle(item.id)} />
          <span className={styles.checkbox} aria-hidden="true">
            {item.checked && <Check size={14} strokeWidth={3} />}
          </span>
          <span>{item.label}</span>
        </label>
      ))}
    </section>
  );
}
