// 역할: 입사자별 온보딩 진행률(완료한 스테이지 수 / 전체 스테이지 수)을 카드 목록으로 표시한다.
// 사용처: ADM_PRG_P01
// 담당자: 김재웅

import BaseCard from "../../../../common/base/BaseCard";
import BaseProgressBar from "../../../../common/base/BaseProgressBar";
import { phaseLabel } from "../../common/adminLabels";
import styles from "./OnboardingProgressList.module.css";

export default function OnboardingProgressList({ employees }) {
  return (
    <div className={styles.list}>
      {employees.map((employee) => <OnboardingProgressCard key={employee.employeeId} employee={employee} />)}
    </div>
  );
}

// 서버는 진행 정도를 "3/9" 문자열로 준다.
const parseStageProgress = (stageProgress) => {
  const [current, total] = String(stageProgress ?? "0/0").split("/").map(Number);
  return { current: current || 0, total: total || 0 };
};

function OnboardingProgressCard({ employee }) {
  const { current, total } = parseStageProgress(employee.stageProgress);

  return (
    <BaseCard className={styles.card}>
      <div className={styles.employeeRow}>
        <span className={styles.avatar}>{employee.name.slice(0, 1)}</span>
        <span className={styles.employeeInfo}>
          <strong>{employee.name}</strong>
          <small>{phaseLabel(employee.currentPhase)}</small>
        </span>
        <strong className={styles.counter}>{current}/{total}</strong>
      </div>
      <BaseProgressBar current={current} total={total} className={styles.progressBar} />
    </BaseCard>
  );
}
