import { useCallback, useEffect, useRef, useState } from "react";
import PathMapHeader from "../common/PathMapHeader";
import { useDialog } from "../../../../hooks/useDialog";
import PathQuizDialog from "../QUZ/PathQuizDialog";
import { PATH_MAP_ITEMS } from "./pathMapData";
import styles from "./PathMap.module.css";

const ASSET_PATH = "/assets/pth/map";

export default function PathMap({ onSelectItem, initialQuizCode }) {
  const currentRef = useRef(null);
  const openedInitialQuizRef = useRef(null);
  const [message, setMessage] = useState("");
  const { showDialog } = useDialog();

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center" });
  }, []);

  const openQuiz = useCallback((quizCode) => {
    showDialog("center", ({ close }) => (
      <PathQuizDialog initialCode={quizCode} onComplete={() => close(true)} />
    ));
  }, [showDialog]);

  useEffect(() => {
    if (!initialQuizCode || openedInitialQuizRef.current === initialQuizCode) return;
    openedInitialQuizRef.current = initialQuizCode;
    openQuiz(initialQuizCode);
  }, [initialQuizCode, openQuiz]);

  const handleItemClick = (item) => {
    if (item.kind === "quiz") {
      openQuiz(item.quizCode);
      return;
    }

    if (!onSelectItem(item.screenCode)) {
      setMessage("연결할 화면이 아직 준비되지 않았어요.");
    }
  };

  return (
    <main className={styles.page}>
      <PathMapHeader title="오솔길" currentStep={0} totalStep={9} />

      <section className={styles.map} aria-label="온보딩 오솔길 지도">
        <img className={styles.trail} src={`${ASSET_PATH}/trail.png`} alt="" />

        {PATH_MAP_ITEMS.map((item, index) => (
          <button
            key={item.id}
            ref={item.kind === "stage" && item.status === "current" ? currentRef : undefined}
            type="button"
            className={`${styles.mapItem} ${styles[item.status] ?? ""} ${styles[item.kind]} ${item.hidden ? styles.hidden : ""}`}
            style={{ left: `${item.x}%`, top: `${item.y}%`, "--float-delay": `${index * -0.16}s` }}
            onClick={() => handleItemClick(item)}
            aria-label={item.label}
          >
            {item.kind === "quiz" ? (
              <img className={styles.quizSign} src={`${ASSET_PATH}/${item.icon}`} alt="" />
            ) : (
              <span className={styles.iconCircle}>
                {item.icon ? <img src={`${ASSET_PATH}/${item.icon}`} alt="" /> : <b>{item.fallback ?? "?"}</b>}
              </span>
            )}
            {item.kind === "stage" && <span className={styles.stageLabel}>STAGE {item.stage}</span>}
            {item.kind !== "quiz" && <span className={styles.itemLabel}>{item.label}</span>}
          </button>
        ))}
      </section>

      {message && <div className={styles.toast} role="status" onAnimationEnd={() => setMessage("")}>{message}</div>}
    </main>
  );
}
