export const COMPLETION_MOCK_NAME = "김핑거";

export const COMPLETION_MOCK_LINES = ["김밥처럼", "핑계대지 않고", "거대하게 가겠습니다"];

export const COMPLETION_MOCK_REPORT = {
  employeeName: COMPLETION_MOCK_NAME,
  headline: "김핑거님의 첫걸음",
  reportContent: "김핑거님은 망설이기보다 먼저 부딪혀보는 편이네요. 새로운 사람과 일에도 열린 태도로 다가가며, 동료와 바로 이야기하는 협업 방식을 선호해요.\n\n여정도 계획에만 머물기보다 직접 경험하며 배우는 스타일이에요. 핑거에서의 첫걸음이 기대되는 이유예요.",
  quote: "먼저 걸어보고, 함께 길을 만들어요.",
  quoteDescription: "도전과 협업을 즐기는 김핑거님의 모습을 한 문장으로 담았어요.",
  keywords: ["먼저 도전", "협업", "빠른 실행", "함께 성장"],
};

export function createMockPoemLines(lines = COMPLETION_MOCK_LINES) {
  return COMPLETION_MOCK_NAME.split("").map((letter, index) => ({ letter, text: lines[index] ?? "" }));
}
