// DialogQuiz.jsx의 역할
// 징검다리 퀴즈(음식/휴식/협업 3세트)의 "내용물"만 담당.
// currentIndex로 문항을 순환시키는 내부 로직은 그대로 유지.
// overlay/box는 DialogShell이 그려주므로, 이제 문항 화면/클리어 화면 내용만 return함.

import { useState } from 'react';
import BaseButton from '../base/BaseButton';
import styles from './dialog.module.css';

export default function DialogQuiz({
  title = '징검다리 퀴즈',
  questions = [],
  onComplete,
  onClose,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isCleared = currentIndex >= questions.length;
  const currentQuestion = questions[currentIndex];

  const handleSelect = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleFinish = () => {
    onComplete?.();
    setCurrentIndex(0);
    onClose?.();
  };

  if (isCleared) {
    return (
      <>
        <p className={styles.quizClearText}>퀴즈 CLEAR!</p>
        <div className={styles.actions}>
          <BaseButton label="완료" onClick={handleFinish} />
        </div>
      </>
    );
  }

  return (
    <>
      <p className={styles.quizTitle}>{title}</p>
      <p>{currentQuestion.question}</p>
      {currentQuestion.subtitle && (
        <p className={styles.quizSubtitle}>{currentQuestion.subtitle}</p>
      )}

      <div className={styles.quizOptions}>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            type="button"
            className={styles.quizOption}
            onClick={handleSelect}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}