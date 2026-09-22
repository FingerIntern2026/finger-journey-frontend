// DialogConfirm.jsx의 역할
// 확인/취소 버튼 2개짜리 다이얼로그의 "내용물"만 담당.
// DialogAlert와 구조는 동일하고 콜백만 2개(onConfirm/onCancel)로 늘어난 버전 — 이 관계는 그대로 유지.

import BaseButton from '../base/BaseButton';
import styles from './dialog.module.css';

export default function DialogConfirm({ message, onConfirm, onCancel }) {
  return (
    <>
      <p>{message}</p>
      <div className={styles.actions}>
        <BaseButton label="취소" variant="secondary" onClick={onCancel} />
        <BaseButton label="확인" onClick={onConfirm} />
      </div>
    </>
  );
}