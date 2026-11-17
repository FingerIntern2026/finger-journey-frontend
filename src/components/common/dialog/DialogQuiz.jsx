// 역할: 이미지형 선택 퀴즈의 문항 진행과 완료 화면을 담당한다.
//      overlay/box는 DialogShell이 그리고, 문항 데이터는 사용하는 기능에서 props로 전달한다.
// 사용처: PathMap.jsx
// 담당자: 김재웅

import { useState } from 'react';
import { parseApiError } from '../../../utils/apiErrorUtils';
import BaseButton from '../base/BaseButton';
import styles from './dialog.module.css';

export default function DialogQuiz({
  title = '징검다리 퀴즈',
  steps,
  initialCode,
  onSaveGroup,
  onComplete,
}) {
  const [currentCode, setCurrentCode] = useState(initialCode);
  const [answers, setAnswers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const currentStep = steps[currentCode];

  // 보기를 고르면 답을 모아 두고 다음 문항으로 간다.
  // 마지막 문항이면 CLEAR 화면으로 가기 전에 모은 답을 저장하고, 저장에 실패하면 그 문항에 남아 다시 고르게 한다.
  const handleSelect = async (option) => {
    if (saving) return;

    const nextAnswers = [...answers, { code: currentCode, option }];
    const nextCode = currentStep.nextCode;

    if (steps[nextCode]?.clear && onSaveGroup) {
      setSaving(true);
      setError('');
      try {
        await onSaveGroup(nextAnswers);
      } catch (err) {
        setError(parseApiError(err).message);
        setSaving(false);
        return;
      }
      setSaving(false);
    }

    setAnswers(nextAnswers);
    setCurrentCode(nextCode);
  };

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
            disabled={saving}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {error && <p role="alert" className={styles.quizError}>{error}</p>}
    </section>
  );
}
