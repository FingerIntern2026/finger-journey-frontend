// http://localhost:5173/pth/map

import { useEffect, useRef, useState } from "react";
import PathMapHeader from "../../components/common/layout/PathMapHeader";
import useNavigationStore from "../../stores/useNavigationStore";
import styles from "./PTH_MAP_P01.module.css";

const MAP_ITEMS = [
  { id: "story", kind: "stage", stage: 1, label: "핑거 이야기", icon: "story.png", screenCode: "PTH_STR_P01", x: 22, y: 4, status: "current" },
  { id: "rules", kind: "stage", stage: 2, label: "취업규칙", icon: "employment-rules.png", screenCode: "PTH_RUL_P01", x: 70, y: 10.5, status: "locked" },
  { id: "quiz-1", kind: "quiz", label: "퀴즈", icon: "quiz.png", screenCode: "PTH_QUZ_C01", x: 72, y: 18, status: "locked" },
  { id: "hr", kind: "stage", stage: 3, label: "인사규정", icon: "hr-rules.png", screenCode: "PTH_HRP_P01", x: 23, y: 23, status: "locked" },
  { id: "ethics", kind: "stage", stage: 4, label: "윤리규정", icon: "ethics.png", screenCode: "PTH_ETH_P01", x: 70, y: 30, status: "locked" },
  { id: "quiz-2", kind: "quiz", label: "퀴즈", icon: "quiz.png", screenCode: "PTH_QUZ_C04", x: 65, y: 39.5, status: "locked" },
  { id: "culture", kind: "stage", stage: 5, label: "문화제도", icon: "culture.png", screenCode: "PTH_CUL_P01", x: 22, y: 42, status: "locked" },
  { id: "email", kind: "stage", stage: 6, label: "이메일", icon: "email.png", screenCode: "PTH_EML_P01", x: 70, y: 53.5, status: "locked" },
  { id: "card", kind: "stage", stage: 7, label: "법인카드", icon: "corporate-card.png", screenCode: "PTH_CRD_P01", x: 23, y: 62, status: "locked" },
  { id: "quiz-3", kind: "quiz", label: "퀴즈", icon: "quiz.png", screenCode: "PTH_QUZ_C07", x: 74, y: 66.8, status: "locked" },
  { id: "forest", kind: "stage", stage: 8, label: "포레스트", icon: "forest.png", screenCode: "PTH_FOR_P01", x: 70, y: 76.5, status: "locked" },
  { id: "level", kind: "stage", stage: 9, label: "레벨업", icon: "level-up.png", screenCode: "PTH_LVL_P01", x: 22, y: 87, status: "locked" },
  { id: "hidden", kind: "stage", stage: 10, label: "?", screenCode: "PTH_CPL_P01", x: 70, y: 96, status: "locked", hidden: true },
];

const ASSET_PATH = "/assets/pth/map";

export default function PTH_MAP_P01({ preview = false }) {
  const goForward = useNavigationStore((state) => state.goForward);
  const currentRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!preview) {
      currentRef.current?.scrollIntoView({ block: "center" });
    }
  }, [preview]);

  const handleItemClick = (item) => {
    if (preview) {
      setMessage(`${item.label} · ${item.screenCode}`);
      return;
    }

    if (item.status === "locked") return;

    if (!goForward(item.screenCode)) {
      setMessage("연결할 화면이 아직 준비되지 않았어요.");
    }
  };

  return (
    <main className={`${styles.page} ${preview ? styles.previewPage : ""}`}>
      <PathMapHeader title="오솔길" currentStep={0} totalStep={10} />

      <section className={styles.map} aria-label="온보딩 오솔길 지도">
        <img className={styles.trail} src={`${ASSET_PATH}/trail.png`} alt="" />

        {MAP_ITEMS.map((item, index) => (
          <button
            key={item.id}
            ref={item.kind === "stage" && item.status === "current" ? currentRef : undefined}
            type="button"
            className={`${styles.mapItem} ${styles[item.status]} ${styles[item.kind]} ${item.hidden ? styles.hidden : ""}`}
            style={{ left: `${item.x}%`, top: `${item.y}%`, "--float-delay": `${index * -0.16}s` }}
            disabled={!preview && item.status === "locked"}
            onClick={() => handleItemClick(item)}
            aria-label={`${item.label}${item.status === "locked" ? " 잠김" : ""}`}
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
