// 역할: 이미지형 선택 퀴즈의 문항 진행과 완료 화면을 담당한다.
//      overlay/box는 DialogShell이 그리고, 문항 데이터는 사용하는 기능에서 props로 전달한다.
// 사용처: PathMap.jsx
// 담당자: 김재웅

import { useState } from 'react';
import BaseButton from '../base/BaseButton';
import styles from './dialog.module.css';

export default function DialogQuiz({
  title = '징검다리 퀴즈',
  steps,
  initialCode,
  onComplete,
}) {
  const [currentCode, setCurrentCode] = useState(initialCode);
  const currentStep = steps[currentCode];

  if (currentStep.clear) {
    return (
      <section className={styles.quizDialog} aria-labelledby="quiz-clear-title">
        <h2 id="quiz-clear-title" className={styles.quizClearTitle}>퀴즈 CLEAR!</h2>
        <img
          className={styles.quizClearImage}
          src={currentStep.image}
          alt={`${currentStep.group} 퀴즈 완료`}
        />
        <BaseButton
          label="✓ 완료 · 맵으로 돌아가기"
          fullWidth
          className={styles.quizCompleteButton}
          onClick={onComplete}
        />
      </section>
    );
  }

  return (
    <section className={styles.quizDialog} aria-labelledby="quiz-title">
      <div className={styles.quizRibbon}>{title}</div>
      <div className={styles.quizQuestionBox}>
        <h2 id="quiz-title" className={styles.quizQuestionTitle}>{currentStep.title}</h2>
        <p className={styles.quizPrompt}>{currentStep.prompt}</p>
        <img className={styles.quizQuestionImage} src={currentStep.image} alt="" />
      </div>
      <div className={styles.quizOptions} aria-label={`${currentStep.title} 선택지`}>
        {currentStep.options.map((option) => (
          <button
            key={option}
            type="button"
            className={styles.quizOption}
            onClick={() => setCurrentCode(currentStep.nextCode)}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}
