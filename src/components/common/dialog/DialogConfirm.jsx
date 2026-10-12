// 역할: 확인/취소 버튼 2개짜리 다이얼로그의 내용물만 담당.
//      DialogAlert와 구조는 동일하고 콜백만 2개(onConfirm/onCancel)로 늘어난 버전.
// 사용처: DialogContext.jsx (showConfirm)
// 담당자: 김재웅

import BaseButton from '../base/BaseButton';
import styles from './dialog.module.css';

export default function DialogConfirm({
  message,
  onConfirm,
  onCancel,
  confirmLabel = "확인",
  cancelLabel = "취소",
  confirmVariant = "primary",
  messageClassName = "",
}) {
  return (
    <div className={styles.confirmPopup}>
      <p className={`${styles.confirmMessage} ${messageClassName}`}>{message}</p>
      <div className={styles.confirmActions}>
        <BaseButton label={cancelLabel} variant="ghost" className={styles.confirmCancel} onClick={onCancel} />
        <BaseButton label={confirmLabel} variant={confirmVariant} className={styles.confirmSubmit} onClick={onConfirm} />
      </div>
    </div>
  );
}
