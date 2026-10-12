import styles from "./FirstDayTimeline.module.css";

export default function FirstDayTimeline({ items }) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => (
        <li className={styles.item} key={item.time}>
          <span className={styles.icon} aria-hidden="true">{item.icon}</span>
          <strong>{item.time} - {item.title}</strong>
        </li>
      ))}
    </ol>
  );
}
