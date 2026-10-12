// 역할: 입사자별 온보딩 진행률과 완료 스테이지를 카드 목록으로 표시한다.
// 사용처: ADM_PRG_P01
// 담당자: 김재웅

import BaseCard from "../../../../common/base/BaseCard";
import BaseProgressBar from "../../../../common/base/BaseProgressBar";
import styles from "./OnboardingProgressList.module.css";

export default function OnboardingProgressList({ employees }) {
  return (
    <div className={styles.list}>
      {employees.map((employee) => <OnboardingProgressCard key={employee.id} employee={employee} />)}
    </div>
  );
}

function OnboardingProgressCard({ employee }) {
  return (
    <BaseCard className={styles.card}>
      <div className={styles.employeeRow}>
        <span className={styles.avatar}>{employee.name.slice(0, 1)}</span>
        <span className={styles.employeeInfo}>
          <strong>{employee.name}</strong>
          <small>{employee.department}</small>
        </span>
        <strong className={styles.counter}>{employee.currentStage}/{employee.totalStage}</strong>
      </div>
      <BaseProgressBar current={employee.currentStage} total={employee.totalStage} className={styles.progressBar} />
      <div className={styles.stageList} aria-label={`${employee.name} 스테이지 진행 현황`}>
        {employee.stages.map((stage, index) => (
          <span key={stage} className={`${styles.stage} ${index < employee.currentStage ? styles.completed : ""}`}>
            {stage}
          </span>
        ))}
      </div>
    </BaseCard>
  );
}
