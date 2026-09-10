// DialogAlert.jsx의 역할
// 확인 버튼 하나짜리 안내/에러 팝업. 열림 상태를 스스로 관리하지 않고 부모(또는 Context)로부터 전달받음

import BaseButton from '../base/BaseButton';
import styles from './dialog.module.css';

export default function DialogAlert({ open, message, onClose, className = '' }) {
    // 조건부 렌더링: open이 false면 return null로 렌더 트리에서 아무것도 그리지 않음
    // (JSX 안에서 if문을 직접 못 쓰기 때문에 return을 일찍 끝내는 방식으로 처리)
    if (!open) {
        return null;
    }

    return (
        <div className={`${styles.overlay} ${className}`}>
            <div className={styles.box}>
                <p>{message}</p>
                {/* onClose는 함수 참조 그대로 전달됨. 실제 실행은 버튼 클릭 시점에 이 함수를 호출하는 쪽(부모)에서 일어남 */}
                <BaseButton label="확인" onClick={onClose} />
            </div>
        </div>
    );
}