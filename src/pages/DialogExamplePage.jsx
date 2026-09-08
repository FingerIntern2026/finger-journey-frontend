// DialogExamplePage.jsx의 역할
// 다이얼로그(버튼③) 데모 페이지. DialogContext의 showAlert/showConfirm을 호출해서
// Alert/Confirm이 실제로 뜨는 걸 보여줌. 별도의 useState 없이 useDialog 하나로 끝남

import BaseButton from '../components/common/base/BaseButton';
import { useDialog } from '../components/common/dialog/DialogContext';

export default function DialogExamplePage() {
    // Context 창고에서 showAlert, showConfirm 함수 꺼내오기
    const { showAlert, showConfirm } = useDialog();

    return (
        <div>
            <h2>다이얼로그 예제</h2>
            {/* 클릭하면 DialogContext 안의 showAlert 실행 -> dialog 상태가 바뀌면서 Alert가 뜸 */}
            <BaseButton
                label="Alert 열기"
                onClick={() => showAlert('저장이 완료되었습니다.')}
            />
            {/* showConfirm의 두 번째 인자는 "확인 눌렀을 때 실행할 함수" */}
            <BaseButton
                label="Confirm 열기"
                onClick={() => showConfirm('정말 삭제하시겠습니까?', () => console.log('삭제 진행됨'))}
            />
        </div>
    );
}