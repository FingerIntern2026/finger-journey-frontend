// 역할: 제목을 누르면 내용이 펼쳐지는 아코디언 목록을 표시한다.
// 사용처: 프리보딩 FAQ, 관리자 위키 카테고리 등

import { useId, useState } from "react";
import styles from "./custom.module.css";

export default function CustomAccordion({
  items,
  className = "",
  defaultOpenIndex = null,
}) {
  const [openedIndex, setOpenedIndex] = useState(defaultOpenIndex);
  const accordionId = useId();

  const handleItemClick = (index) => {
    setOpenedIndex((currentIndex) => (
      currentIndex === index ? null : index
    ));
  };

  return (
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item, index) => {
        const isOpen = openedIndex === index;
        const contentId = `${accordionId}-${index}`;

        return (
          <div className={styles.accordionItem} key={item.id ?? item.title}>
            <button
              type="button"
              className={styles.accordionButton}
              onClick={() => handleItemClick(index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
            >
              <span>{item.title}</span>
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div id={contentId} className={styles.accordionContent}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
