import { BadgeCheck } from "lucide-react";
import styles from "./EmployeeWelcomeCard.module.css";

export default function EmployeeWelcomeCard({ name, department, className = "" }) {
  return (
    <section className={`${styles.celebration} ${className}`} aria-label={`${name}님의 사원증`}>
      <span className={`${styles.confetti} ${styles.confettiOne}`} />
      <span className={`${styles.confetti} ${styles.confettiTwo}`} />
      <span className={`${styles.confetti} ${styles.confettiThree}`} />
      <article className={styles.card}>
        <span className={styles.cardLogo}><BadgeCheck size={30} aria-hidden="true" /></span>
        <strong>{name}</strong>
        <span>{department}</span>
      </article>
    </section>
  );
}
