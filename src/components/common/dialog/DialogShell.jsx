// 역할: Alert/Confirm/Quiz 등 다이얼로그 내용물을 감싸서, type(full/bottom/center)에 따라
//      오버레이(배경)와 박스의 위치·애니메이션만 다르게 그려주는 공통 껍데기. 내용물이 무엇이든
//      "어디에 어떻게 뜨는지"만 책임지고 "무엇을 보여줄지"는 children이 결정. open 여부도
//      스스로 판단하지 않고, 그릴지 말지는 호출하는 쪽(DialogContext의 스택)이 결정함.
// 사용처: DialogContext.jsx
// 담당자:

import { useRef } from 'react';
import styles from './dialog.module.css';

export default function DialogShell({ type = 'center', isTop = true, onClose, children }) {
  // 배경에서 "누르기 시작한" 경우에만 닫는다. 파일 선택창에서 더블클릭하면 두 번째 클릭이
  // 창이 닫힌 뒤 배경으로 전달되는데, 이때는 누르기를 배경에서 시작하지 않았으므로 닫지 않는다.
  const pressedOnBackdrop = useRef(false);

  const handleBackdropMouseDown = (event) => {
    pressedOnBackdrop.current = event.target === event.currentTarget;
  };

  const handleBackdropClick = (event) => {
    const shouldClose = pressedOnBackdrop.current && event.target === event.currentTarget;
    pressedOnBackdrop.current = false;
    if (shouldClose) onClose?.(null);
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
      onMouseDown={handleBackdropMouseDown}
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