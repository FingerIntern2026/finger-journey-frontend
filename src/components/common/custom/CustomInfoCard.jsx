// 역할: 아이콘, 제목, 설명으로 구성된 정보 안내 카드를 표시한다.
// 사용처: 프리보딩 메인 등 안내 정보가 반복되는 화면

import BaseCard from "../base/BaseCard";
import styles from "./custom.module.css";

export default function CustomInfoCard({
  icon,
  title,
  description,
  className = "",
}) {
  return (
    <BaseCard className={`${styles.infoCard} ${className}`}>
      {icon && <span className={styles.infoCardIcon} aria-hidden="true">{icon}</span>}
      <div>
        <h3 className={styles.infoCardTitle}>{title}</h3>
        {description && <p className={styles.infoCardDescription}>{description}</p>}
      </div>
    </BaseCard>
  );
}
