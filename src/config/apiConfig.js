// 역할: 백엔드 서버 기본 주소를 한 곳에 상수로 모아둠
// 사용처: client.js, ChatPanel.jsx
// 담당자:

export const API_BASE_URL = "http://localhost:8080";

// 챗봇(/api/chat)은 Spring을 거치지 않고 finger-journey-ai(FastAPI) 서버에 직접 요청함
// (완주 리포트처럼 Spring이 중간에서 DB 조회를 끼워야 할 이유가 없어서 아직 프록시가 없음)
export const AI_SERVER_URL = "http://localhost:8000";
