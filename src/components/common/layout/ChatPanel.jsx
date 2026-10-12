import { useState } from "react";
import { Leaf, Send, X } from "lucide-react";
import { AI_SERVER_URL } from "../../../config/apiConfig";
import styles from "./chatPanel.module.css";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  text: "안녕하세요! 오늘도 핑거 위키를, 궁금한 게 있으면 편하게 물어보세요 🌱",
};

const SUGGESTED_QUESTIONS = [
  "이메일 계정 언제 열려요?",
  "법인카드 한도가 얼마예요?",
  "아마란스 어떻게 설치해요?",
];

export default function ChatPanel({ onClose, embedded = false }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (overrideText) => {
    const textToSend = (overrideText ?? input).trim();

    if (!textToSend || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${AI_SERVER_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(({ role, text }) => ({ role, text })),
        }),
      });

      if (!response.ok) throw new Error("챗봇 요청에 실패했습니다.");

      const data = await response.json();
      setMessages((previous) => [
        ...previous,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: data.reply,
          source: data.source,
        },
      ]);
    } catch (error) {
      console.error("챗봇 오류:", error);
      setMessages((previous) => [
        ...previous,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          text: "아직 정확한 답변을 준비하지 못했어요 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const panel = (
    <section className={styles.panel} aria-label="핑거 AI 챗봇">
      <header className={styles.header}>
        <span className={styles.logo}><Leaf size={23} aria-hidden="true" /></span>
        <div className={styles.headerText}>
          <strong>핑거 AI 챗봇</strong>
          <span>사내 문서기반으로 답변해요</span>
        </div>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="챗봇 닫기">
          <X size={22} aria-hidden="true" />
        </button>
      </header>

      <div className={styles.messages} aria-live="polite">
        {messages.map((message) => (
          <div key={message.id} className={`${styles.messageRow} ${styles[message.role]}`}>
            <div className={styles.bubble}>
              <p>{message.text}</p>
              {message.source && <small className={styles.source}>참고: {message.source}</small>}
            </div>
          </div>
        ))}

        {loading && (
          <div className={`${styles.messageRow} ${styles.assistant}`} aria-label="답변 생성 중">
            <div className={`${styles.bubble} ${styles.typingBubble}`}>
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      <div className={styles.suggestionArea}>
        {SUGGESTED_QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            className={styles.suggestion}
            onClick={() => handleSend(question)}
            disabled={loading}
          >
            {question}
          </button>
        ))}
      </div>

      <form
        className={styles.inputRow}
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
      >
        <input
          className={styles.input}
          value={input}
          placeholder="궁금한 걸 물어보세요"
          onChange={(event) => setInput(event.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={loading || !input.trim()}
          aria-label="메시지 전송"
        >
          <Send size={20} aria-hidden="true" />
        </button>
      </form>
    </section>
  );

  if (embedded) return <main className={styles.embeddedPage}>{panel}</main>;

  return <div className={styles.overlay}>{panel}</div>;
}
