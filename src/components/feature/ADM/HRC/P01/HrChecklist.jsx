import styles from "./HrChecklist.module.css";

export default function HrChecklist({ employeeName, items, onToggle }) {
  return (
    <section className={styles.section} aria-label={`${employeeName} HR 체크리스트`}>
      {items.map((item) => (
        <label className={styles.row} key={item.id}>
          <input type="checkbox" checked={item.checked} onChange={() => onToggle(item.id)} />
          <span className={styles.checkbox} aria-hidden="true">{item.checked ? "✓" : ""}</span>
          <span>{item.label}</span>
        </label>
      ))}
    </section>
  );
}
