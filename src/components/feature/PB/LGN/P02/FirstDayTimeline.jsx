// 역할: 첫 출근일에 수행할 온보딩 순서를 타임라인으로 안내한다.
// 사용처: PB_LGN_P02
// 담당자: 김재웅

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
