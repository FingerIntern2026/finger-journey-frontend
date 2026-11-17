import { useCallback, useEffect, useRef, useState } from "react";
import PathMapHeader from "../common/PathMapHeader";
import usePathProgress from "../common/usePathProgress";
import { enterStage } from "../../../../api/pathApi";
import { useDialog } from "../../../../hooks/useDialog";
import usePathStore from "../../../../stores/pathStore";
import { parseApiError } from "../../../../utils/apiErrorUtils";
import DialogQuiz from "../../../common/dialog/DialogQuiz";
import { QUIZ_STEPS } from "../QUZ/quizData";
import useQuizProgress from "../QUZ/useQuizProgress";
import { PATH_MAP_ITEMS } from "./pathMapData";
import styles from "./PathMap.module.css";

const ASSET_PATH = "/assets/pth/map";

export default function PathMap({ onSelectItem, initialQuizCode }) {
  const currentRef = useRef(null);
  const openedInitialQuizRef = useRef(null);
  const [message, setMessage] = useState("");
  const { showDialog } = useDialog();
  const { completed, total, loaded } = usePathProgress();
  const stages = usePathStore((state) => state.stages);
  const { isGroupDone, saveGroup } = useQuizProgress();

  // 서버 진행 상태가 있으면 그걸로 각 스테이지의 상태를 정한다.
  // 끝낸 스테이지는 completed, 그다음 하나는 current, 나머지는 locked. 서버 값이 없으면 예전 고정 상태를 쓴다.
  const hasServerData = loaded && stages.length > 0;
  const allStagesCompleted = hasServerData && stages.every((stage) => stage.status === "COMPLETED");
  const firstUnfinishedOrder = hasServerData
    ? stages.find((stage) => stage.status !== "COMPLETED")?.stageOrder
    : null;

  const statusOf = (item) => {
    if (!hasServerData) return item.status;
    if (item.kind === "quiz") return isGroupDone(item.quizCode) ? "completed" : "available";
    if (item.hidden) return allStagesCompleted ? "current" : "locked";

    const stage = stages.find((candidate) => candidate.stageOrder === item.stage);
    if (stage?.status === "COMPLETED") return "completed";
    return stage?.stageOrder === firstUnfinishedOrder ? "current" : "locked";
  };

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center" });
  }, [loaded]);

  const openQuiz = useCallback((quizCode) => {
    showDialog("center", ({ close }) => (
      <DialogQuiz
        steps={QUIZ_STEPS}
        initialCode={quizCode}
        onSaveGroup={saveGroup}
        onComplete={() => close(true)}
      />
    ));
  }, [showDialog, saveGroup]);

  useEffect(() => {
    if (!initialQuizCode || openedInitialQuizRef.current === initialQuizCode) return;
    openedInitialQuizRef.current = initialQuizCode;
    openQuiz(initialQuizCode);
  }, [initialQuizCode, openQuiz]);

  const handleItemClick = async (item) => {
    if (item.kind === "quiz") {
      if (isGroupDone(item.quizCode)) {
        setMessage("이미 완료한 퀴즈예요.");
        return;
      }
      openQuiz(item.quizCode);
      return;
    }

    if (hasServerData) {
      if (item.hidden) {
        if (!allStagesCompleted) {
          setMessage("모든 스테이지를 완료하면 열려요.");
          return;
        }
      } else {
        // 서버가 이전 스테이지를 끝냈는지 확인하고, 안 끝냈으면 이유를 알려준다.
        const stage = stages.find((candidate) => candidate.stageOrder === item.stage);
        try {
          await enterStage(stage.stageId);
        } catch (err) {
          setMessage(parseApiError(err).message);
          return;
        }
      }
    }

    if (!onSelectItem(item.screenCode)) {
      setMessage("연결할 화면이 아직 준비되지 않았어요.");
    }
  };

  return (
    <main className={styles.page}>
      <PathMapHeader title="오솔길" currentStep={completed} totalStep={total} />

      <section className={styles.map} aria-label="온보딩 오솔길 지도">
        <img className={styles.trail} src={`${ASSET_PATH}/trail.png`} alt="" />

        {PATH_MAP_ITEMS.map((item, index) => {
          const status = statusOf(item);

          return (
            <button
              key={item.id}
              ref={item.kind === "stage" && status === "current" ? currentRef : undefined}
              type="button"
              className={`${styles.mapItem} ${styles[status] ?? ""} ${styles[item.kind]} ${item.hidden ? styles.hidden : ""}`}
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
          );
        })}
      </section>

      {message && <div className={styles.toast} role="status" onAnimationEnd={() => setMessage("")}>{message}</div>}
    </main>
  );
}
