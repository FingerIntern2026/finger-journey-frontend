// DialogShell.jsx의 역할
// Alert / Confirm / Quiz 등 다이얼로그 "내용물"을 감싸서,
// type(full/bottom/center)에 따라 오버레이(배경)와 박스의 위치·애니메이션만
// 다르게 그려주는 공통 껍데기.
//
// 내용물이 무엇이든(Alert 메시지든, Confirm 버튼이든, Quiz 문항이든)
// 이 컴포넌트는 "어디에 어떻게 뜨는지"만 책임지고, "무엇을 보여줄지"는 전혀 모름
// (children이 결정).
//
// ※ open 여부를 스스로 판단하지 않음 — 기존 DialogAlert/DialogConfirm처럼
//   `if (!open) return null`을 여기서 하지 않고, "지금 이걸 그릴지 말지"는
//   이 컴포넌트를 호출하는 쪽(4단계에서 만들 DialogContext의 스택)이 결정함.

import styles from './dialog.module.css';

export default function DialogShell({ type = 'center', isTop = true, onClose, children }) {
  const handleBackdropClick = () => {
    onClose?.(null);
  };

  const handleContentClick = (event) => {
    // 박스 내부 클릭이 배경까지 전파되어 다이얼로그가 닫히는 걸 방지
    event.stopPropagation();
  };

  // dialog.module.css에 있는 overlayCenter / overlayBottom / overlayFull,
  // boxCenter / boxBottom / boxFull 클래스를 type에 맞춰 동적으로 조회
  const overlayClassName = styles[`overlay${capitalize(type)}`] ?? styles.overlay;
  const boxClassName = styles[`box${capitalize(type)}`] ?? styles.box;

  return (
    <div
      className={overlayClassName}
      style={{ zIndex: isTop ? 1001 : 1000 }}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={boxClassName}
        onClick={handleContentClick}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}