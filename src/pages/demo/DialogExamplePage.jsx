// 페이지명: DialogExamplePage (TODO: 정식 화면명 확정되면 교체)
// 역할: 다이얼로그(버튼③) 데모 페이지. DialogContext의 showAlert/showConfirm/showDialog를
//       호출해서 Alert/Confirm/Quiz가 실제로 뜨는 걸 보여줌. 리팩토링 이후로는 Quiz도
//       showDialog를 통해 열리므로, 이 페이지가 따로 open 상태를 관리할 필요가 없어짐
//       (기존엔 useState(quizOpen)으로 직접 관리했음)
// 사용처: DemoIndexPage에서 "③ 다이얼로그예제" 버튼(goTo(ROUTE_PATHS.DEMO_DIALOG))으로 진입
// url: /demo/dialog
// 담당자:

import BaseButton from '../../components/common/base/BaseButton.jsx';
import { useDialog } from '../../components/common/dialog/DialogContext.jsx';
import DialogQuiz from '../../components/common/dialog/DialogQuiz.jsx';

const foodQuestions = [
  { question: 'Q1 커피 취향', subtitle: '어떤 커피를 좋아하시나요?', options: ['아메리카노', '라떼', '달달한 음료', '커피 안 마셔요'] },
  { question: 'Q2 맵기 레벨', subtitle: '어떤 맵기를 잘 드시나요?', options: ['못 먹어요', '살짝 매운맛(신라면)', '매운맛(불닭)', '매운맛 러버'] },
  { question: 'Q3 식사 스타일', subtitle: '점심시간엔 보통?', options: ['혼밥', '동료와 함께', '배달', '도시락'] },
];

export default function DialogExamplePage() {
    const { showAlert, showConfirm, showDialog } = useDialog();

    const handleOpenQuiz = () => {
        showDialog('center', ({ close }) => (
            <DialogQuiz
                questions={foodQuestions}
                onComplete={() => console.log('퀴즈 클리어!')}
                onClose={() => close()}
            />
        ));
    };

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
                onClick={handleOpenQuiz}
            />
        </div>
    );
}