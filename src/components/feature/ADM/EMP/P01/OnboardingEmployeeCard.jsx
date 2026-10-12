import BaseButton from "../../../../common/base/BaseButton";
import BaseCard from "../../../../common/base/BaseCard";
import styles from "./OnboardingEmployeeCard.module.css";

export default function OnboardingEmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <BaseCard className={styles.card}>
      <div className={styles.avatar} aria-hidden="true">{employee.name.slice(0, 1)}</div>

      <div className={styles.information}>
        <strong>{employee.name}</strong>
        <span>{employee.employeeNo} · {employee.department}</span>
        <div className={styles.meta}>
          <time dateTime={employee.joinDate}>{employee.joinDate}</time>
          <span>{employee.progress}% 완료</span>
        </div>
      </div>

      <div className={styles.actions}>
        <BaseButton label="수정" variant="ghost" className={styles.editButton} onClick={onEdit} />
        <BaseButton label="삭제" variant="danger" className={styles.deleteButton} onClick={onDelete} />
      </div>
    </BaseCard>
  );
}
