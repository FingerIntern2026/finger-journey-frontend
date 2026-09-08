// DialogConfirm.jsx의 역할
// 확인/취소 버튼 2개짜리 확인 팝업. DialogAlert와 구조는 동일하고 콜백만 2개(onConfirm/onCancel)로 늘어난 버전

import BaseButton from '../base/BaseButton';

export default function DialogConfirm({ open, message, onConfirm, onCancel }) {
    if (!open) {
        return null;
    }

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <p>{message}</p>
                <div className="dialog-actions">
                    {/* 이 컴포넌트는 "확인/취소가 뭘 의미하는지" 전혀 모름. 그냥 받은 콜백을 실행할 뿐*/}
                    <BaseButton label="취소" onClick={onCancel} />
                    <BaseButton label="확인" onClick={onConfirm} />
                </div>
            </div>
        </div>
    );
}