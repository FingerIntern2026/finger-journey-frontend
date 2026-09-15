// DialogExamplePage.jsx의 역할
// 다이얼로그(버튼③) 데모 페이지. DialogContext의 showAlert/showConfirm을 호출해서
// Alert/Confirm이 실제로 뜨는 걸 보여줌.
// DialogQuiz는 useDialog Context에 안 묶여있는 독립 컴포넌트라 (지난번에 설명드린 이유),
// 별도 useState(quizOpen)로 open 상태를 직접 관리함

import { useState } from 'react';
import BaseButton from '../../components/common/base/BaseButton.jsx';
import { useDialog } from '../../components/common/dialog/DialogContext.jsx';
import DialogQuiz from '../../components/common/dialog/DialogQuiz.jsx';

const foodQuestions = [
  { question: 'Q1 커피 취향', subtitle: '어떤 커피를 좋아하시나요?', options: ['아메리카노', '라떼', '달달한 음료', '커피 안 마셔요'] },
  { question: 'Q2 맵기 레벨', subtitle: '어떤 맵기를 잘 드시나요?', options: ['못 먹어요', '살짝 매운맛(신라면)', '매운맛(불닭)', '매운맛 러버'] },
  { question: 'Q3 식사 스타일', subtitle: '점심시간엔 보통?', options: ['혼밥', '동료와 함께', '배달', '도시락'] },
];

export default function DialogExamplePage() {
    const { showAlert, showConfirm } = useDialog();
    // DialogQuiz는 Context가 아니라 이 페이지가 직접 open 상태를 들고 있어야 함
    const [quizOpen, setQuizOpen] = useState(false);

    return (
        <div>
            <h2>다이얼로그 예제</h2>
            <BaseButton
                label="Alert 열기"
                onClick={() => showAlert('저장이 완료되었습니다.')}
            />
            <BaseButton
                label="Confirm 열기"
                onClick={() => showConfirm('정말 삭제하시겠습니까?', () => console.log('삭제 진행됨'))}
            />
            <BaseButton
                label="Quiz 열기"
                onClick={() => setQuizOpen(true)}
            />

            <DialogQuiz
                open={quizOpen}
                questions={foodQuestions}
                onComplete={() => console.log('퀴즈 클리어!')}
                onClose={() => setQuizOpen(false)}
            />
        </div>
    );
}