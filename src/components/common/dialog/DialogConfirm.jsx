// DialogConfirm.jsx의 역할
// 확인/취소 버튼 2개짜리 확인 팝업. DialogAlert와 구조는 동일하고 콜백만 2개(onConfirm/onCancel)로 늘어난 버전

import BaseButton from '../base/BaseButton';
import styles from './dialog.module.css';

export default function DialogConfirm({ open, message, onConfirm, onCancel, className = '' }) {
    if (!open) {
        return null;
    }

    return (
        <div className={`${styles.overlay} ${className}`}>
            <div className={styles.box}>
                <p>{message}</p>
                <div className={styles.actions}>
                    {/* 이 컴포넌트는 "확인/취소가 뭘 의미하는지" 전혀 모름. 그냥 받은 콜백을 실행할 뿐 */}
                    {/* 취소 버튼은 variant="secondary"로 확인 버튼과 시각적으로 구분 (기존엔 구분 없었음, 이번에 추가) */}
                    <BaseButton label="취소" variant="secondary" onClick={onCancel} />
                    <BaseButton label="확인" onClick={onConfirm} />
                </div>
            </div>
        </div>
    );
}