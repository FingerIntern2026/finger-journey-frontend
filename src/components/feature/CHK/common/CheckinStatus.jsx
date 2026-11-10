import styles from './CheckinStatus.module.css';

export default function CheckinStatus({ complete = false }) {
  return (
    <span role="status" className={`${styles.badge} ${complete ? styles.complete : styles.waiting}`}>
      <span className={styles.icon} aria-hidden="true">{complete ? '✓' : '⌛'}</span>
      {complete ? '확인 완료' : '대기중'}
    </span>
  );
}
