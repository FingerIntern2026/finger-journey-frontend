// DialogAlert.jsx의 역할
// 확인 버튼 하나짜리 안내/에러 다이얼로그의 "내용물"만 담당.
// overlay(배경)/box(흰 박스)는 더 이상 여기서 그리지 않음 — DialogShell이 담당.
// open 여부도 여기서 판단하지 않음 — 렌더되고 있다는 것 자체가 "열려 있다"는 뜻(4단계에서 확정).

import BaseButton from '../base/BaseButton';

export default function DialogAlert({ message, onConfirm }) {
  return (
    <>
      <p>{message}</p>
      <BaseButton label="확인" onClick={onConfirm} />
    </>
  );
}