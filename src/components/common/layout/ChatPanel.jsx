// ChatPanel.jsx의 역할
// ChatEntryButton을 눌렀을 때 뜨는 온보딩 챗봇 풀팝업
// 로직/레이아웃은 finger-journey-ai/frontend/src/App.jsx(어제 만든 챗봇 데모 페이지)를 그대로 옮겨온 것 —
// 그 페이지는 독립된 풀페이지 앱이라 이 프로젝트에서 재사용할 수 없어서, 같은 UI를
// 화면 전체를 덮는 오버레이 팝업 컴포넌트로 포팅함
//
// AI_SERVER_URL(finger-journey-ai, FastAPI)에 직접 요청함 — Spring을 거치지 않음
// (완주 리포트와 달리 챗봇은 DB 조회가 필요 없어서 지금은 프록시가 없음)

import { useState } from "react";
import { AI_SERVER_URL } from "../../../config/apiConfig";
import styles from "./chatPanel.module.css";

const SUGGESTED_QUESTIONS = [
  "근무시간이 어떻게 되나요?",
  "연차는 어떻게 신청하나요?",
  "재택근무 가능한가요?",
  "복장 규정이 있나요?",
];

export default function ChatPanel({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (overrideText) => {
    const textToSend = overrideText ?? input;
    if (!textToSend.trim() || loading) return;

    const currentInput = textToSend.trim();
    const userMessage = { role: "user", text: currentInput };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${AI_SERVER_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput, history: messages }),
      });

      if (!response.ok) {
        throw new Error("챗봇 요청에 실패했습니다.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (error) {
      console.error("챗봇 오류:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "잠시 후 다시 시도해주세요. (챗봇 서버 연결 실패)" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 오버레이(어둡게 깔린 배경) 클릭 시 닫히고, 카드 내부 클릭은 전파를 막아 안 닫히게 함
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <p className={styles.title}>Finger Journey</p>
          <p className={styles.subtitle}>신규 입사자 온보딩 챗봇</p>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="챗봇 닫기">
            ✕
          </button>
        </div>

        <div className={styles.messages}>
          {messages.length === 0 && !loading && (
            <p className={styles.emptyHint}>궁금한 사내 규정을 물어보세요.</p>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.messageRow} ${message.role === "user" ? styles.user : styles.assistant}`}
            >
              <div className={styles.bubble}>{message.text}</div>
            </div>
          ))}

          {loading && (
            <div className={`${styles.messageRow} ${styles.assistant}`}>
              <div className={styles.bubble}>답변을 작성하고 있습니다...</div>
            </div>
          )}
        </div>

        {!loading && (
          <div className={styles.chipRow}>
            {SUGGESTED_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                className={styles.chip}
                onClick={() => handleSend(question)}
                data-trace={`추천 질문 클릭: "${question}" → fetch(/api/chat)`}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div className={styles.inputRow}>
          <textarea
            className={styles.textarea}
            value={input}
            placeholder="질문을 입력하세요."
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            type="button"
            className={styles.sendButton}
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            aria-label="메시지 전송"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
