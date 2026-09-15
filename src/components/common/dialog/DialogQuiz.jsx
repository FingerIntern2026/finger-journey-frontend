// DialogQuiz.jsx의 역할
// 징검다리 퀴즈(음식/휴식/협업 3세트) 팝업
//    * Figma 실제 화면(PTH_QUZ_C01~C04) 확인 결과 정답/오답 채점이 없는 취향 설문 형식.
//      어떤 선택지를 골라도 다음 문항으로 넘어가고, 마지막 문항까지 답하면 "퀴즈 CLEAR!" 화면으로 전환됨
//
// DialogAlert/DialogConfirm과 동일하게 open은 부모가 들고 있는 구조
// 문항 여러 개를 이 컴포넌트가 통째로 받아서, 내부적으로 currentIndex로 순환시킴
// (DialogAlert류는 "매번 다른 내용으로 다시 렌더"되는 구조였지만, 퀴즈는 3문항이
//  한 세트로 묶여서 진행되는 흐름이라 questions 배열 전체를 받는 게 자연스러움)

import { useState } from 'react';
import BaseButton from '../base/BaseButton';
import styles from './dialog.module.css';

// questions: [{ question: 'Q1 커피 취향', subtitle: '어떤 커피를 좋아하시나요?', options: ['아메리카노', '라떼', '달달한 음료', '커피 안 마셔요'] }, ...]
// onComplete: 마지막 문항까지 다 답했을 때 호출 (클리어 처리, AI 리포트 트리거 등)
// onClose: 팝업이 닫힐 때 (클리어 화면의 "완료" 버튼 클릭 시) 호출
export default function DialogQuiz({
    open,
    title = '징검다리 퀴즈',
    questions = [],
    onComplete,
    onClose,
    className = '',
}) {
    // 지금 몇 번째 문항인지. questions.length에 도달하면 "클리어" 상태로 간주
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!open) {
        return null;
    }

    const isCleared = currentIndex >= questions.length;
    const currentQuestion = questions[currentIndex];

    const handleSelect = () => {
        // 정답 체크 없이, 선택하면 무조건 다음 문항으로 넘어감
        // 마지막 문항이었으면 currentIndex가 questions.length가 되면서 클리어 화면으로 전환됨
        setCurrentIndex((prev) => prev + 1);
    };

    const handleFinish = () => {
        onComplete?.();
        // 다음에 다른 세트(휴식/협업)로 다시 열렸을 때 처음부터 시작하도록 초기화
        setCurrentIndex(0);
        onClose?.();
    };

    return (
        <div className={`${styles.overlay} ${className}`}>
            <div className={styles.box}>
                {isCleared ? (
                    // ===== 클리어 화면 (PTH_QUZ_C04와 동일 패턴) =====
                    <>
                        <p className={styles.quizClearText}>퀴즈 CLEAR!</p>
                        <div className={styles.actions}>
                            <BaseButton label="완료" onClick={handleFinish} />
                        </div>
                    </>
                ) : (
                    // ===== 문항 화면 =====
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
                )}
            </div>
        </div>
    );
}

/* ===== 사용 예시 (데모/목업 — 퀴즈_음식 세트) =====

const foodQuestions = [
  { question: 'Q1 커피 취향', subtitle: '어떤 커피를 좋아하시나요?', options: ['아메리카노', '라떼', '달달한 음료', '커피 안 마셔요'] },
  { question: 'Q2 맵기 레벨', subtitle: '어떤 맵기를 잘 드시나요?', options: ['못 먹어요', '살짝 매운맛(신라면)', '매운맛(불닭)', '매운맛 러버'] },
  { question: 'Q3 식사 스타일', subtitle: '점심시간엔 보통?', options: ['혼밥', '동료와 함께', '배달', '도시락'] },
];

<DialogQuiz
  open={quizOpen}
  questions={foodQuestions}
  onComplete={() => console.log('음식 퀴즈 클리어!')}
  onClose={() => setQuizOpen(false)}
/>

*/