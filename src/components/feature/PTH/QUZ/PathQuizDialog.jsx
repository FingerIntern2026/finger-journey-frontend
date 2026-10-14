import { useState } from "react";
import BaseButton from "../../../common/base/BaseButton";
import { getQuizStep } from "./quizData";
import styles from "./PathQuiz.module.css";

export default function PathQuizDialog({ initialCode, onComplete }) {
  const [currentCode, setCurrentCode] = useState(initialCode);
  const step = getQuizStep(currentCode);

  if (step.clear) {
    return (
      <section className={styles.dialog} aria-labelledby="quiz-clear-title">
        <h2 id="quiz-clear-title" className={styles.clearTitle}>퀴즈 CLEAR!</h2>
        <img className={styles.clearImage} src={step.image} alt={`${step.group} 퀴즈 완료`} />
        <BaseButton
          label="✓ 완료 · 맵으로 돌아가기"
          fullWidth
          className={styles.completeButton}
          onClick={onComplete}
        />
      </section>
    );
  }

  return (
    <section className={styles.dialog} aria-labelledby="quiz-title">
      <div className={styles.ribbon}>징검다리 퀴즈</div>
      <div className={styles.questionBox}>
        <h2 id="quiz-title" className={styles.questionTitle}>{step.title}</h2>
        <p className={styles.prompt}>{step.prompt}</p>
        <img className={styles.questionImage} src={step.image} alt="" />
      </div>
      <div className={styles.options} aria-label={`${step.title} 선택지`}>
        {step.options.map((option) => (
          <button
            key={option}
            type="button"
            className={styles.option}
            onClick={() => setCurrentCode(step.nextCode)}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}
