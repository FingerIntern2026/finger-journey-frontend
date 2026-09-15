/**
 * ChatEntryButton (챗봇 진입 플로팅 버튼)
 *
 * 핑거위키 목록 화면(WIK_LIS_P01) 우측 하단에 떠있는 말풍선 버튼.
 * 클릭하면 ChatPanel을 엶 (인터페이스 명세서 3.3.6).
 *
 * ※ 스타일은 layout.module.css의 CSS Modules 클래스를 사용함
 */
import { MessageCircle } from 'lucide-react';
import styles from './layout.module.css';

const ChatEntryButton = ({ onClick, unreadCount = 0 }) => {
  return (
    <button className={styles.chatEntryButton} onClick={onClick} aria-label="챗봇 열기">
      <MessageCircle size={24} />
      {unreadCount > 0 && (
        <span className={styles.chatEntryBadge}>{unreadCount}</span>
      )}
    </button>
  );
};

export default ChatEntryButton;
