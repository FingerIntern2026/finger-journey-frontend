// 역할: 가로로 넘치는 목록(예: HR확인의 입사자 탭)을 마우스로 끌어서 좌우로 스크롤하게 한다.
//       터치 화면은 브라우저가 기본으로 스크롤해 주지만, 마우스는 끌어도 움직이지 않아서 필요하다.
//       끌고 난 뒤에 항목이 클릭으로 선택되지 않도록, 5px 이상 움직였으면 그 클릭은 막는다.
// 사용처: AdminHrManagement.jsx
// 담당자: 김재웅

import { useRef } from "react";

const DRAG_THRESHOLD = 5;

export default function useDragScroll() {
  const ref = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onMouseDown = (event) => {
    if (event.button !== 0 || !ref.current) return;
    drag.current = { active: true, startX: event.clientX, startScroll: ref.current.scrollLeft, moved: false };
  };

  const onMouseMove = (event) => {
    const state = drag.current;
    if (!state.active || !ref.current) return;

    const distance = event.clientX - state.startX;
    if (Math.abs(distance) > DRAG_THRESHOLD) state.moved = true;
    ref.current.scrollLeft = state.startScroll - distance;
  };

  const stop = () => {
    drag.current.active = false;
  };

  // 끌어서 움직였다면 그 직후의 클릭(탭 선택)을 막는다.
  const onClickCapture = (event) => {
    if (!drag.current.moved) return;
    event.stopPropagation();
    event.preventDefault();
    drag.current.moved = false;
  };

  return { ref, onMouseDown, onMouseMove, onMouseUp: stop, onMouseLeave: stop, onClickCapture };
}
