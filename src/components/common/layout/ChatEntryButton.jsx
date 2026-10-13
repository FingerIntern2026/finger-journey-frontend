// 역할: 어느 서비스 화면에서나 챗봇을 열고, 모바일 앱 프레임 안에서 위치를 옮길 수 있는 진입 버튼.
// 사용처: App.jsx
// 담당자: 김재웅
import { MessageCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import styles from './layout.module.css';

const APP_FRAME_WIDTH = 480;
const EDGE_GAP = 12;
const DRAG_THRESHOLD = 6;

const ChatEntryButton = ({ onClick, unreadCount = 0 }) => {
  const [position, setPosition] = useState(null);
  const dragState = useRef(null);
  const preventClick = useRef(false);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    dragState.current = {
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragState.current) return;

    const dragDistance = Math.hypot(
      event.clientX - dragState.current.startX,
      event.clientY - dragState.current.startY,
    );

    if (dragDistance > DRAG_THRESHOLD) {
      dragState.current.moved = true;
    }

    if (!dragState.current.moved) return;

    const buttonSize = event.currentTarget.getBoundingClientRect().width;
    const frameWidth = Math.min(window.innerWidth, APP_FRAME_WIDTH);
    const frameLeft = (window.innerWidth - frameWidth) / 2;
    const minLeft = frameLeft + EDGE_GAP;
    const maxLeft = frameLeft + frameWidth - buttonSize - EDGE_GAP;
    const minTop = EDGE_GAP;
    const maxTop = window.innerHeight - buttonSize - EDGE_GAP;

    setPosition({
      left: Math.min(maxLeft, Math.max(minLeft, event.clientX - dragState.current.offsetX)),
      top: Math.min(maxTop, Math.max(minTop, event.clientY - dragState.current.offsetY)),
    });
  };

  const handlePointerUp = (event) => {
    if (!dragState.current) return;

    if (dragState.current.moved) {
      preventClick.current = true;
    }

    dragState.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleClick = () => {
    if (preventClick.current) {
      preventClick.current = false;
      return;
    }

    onClick();
  };

  return (
    <button
      type="button"
      className={styles.chatEntryButton}
      style={position ? { left: position.left, top: position.top, right: 'auto', bottom: 'auto' } : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      aria-label="챗봇 열기"
    >
      <MessageCircle size={24} />
      {unreadCount > 0 && (
        <span className={styles.chatEntryBadge}>{unreadCount}</span>
      )}
    </button>
  );
};

export default ChatEntryButton;
