// 서버가 주는 온보딩 단계 코드(currentPhase)를 화면에 보여줄 한글로 바꾼다.
const PHASE_LABELS = {
  PREBOARDING: "프리보딩",
  ONBOARDING: "온보딩",
  COMPLETED: "완료",
};

export const phaseLabel = (phase) => PHASE_LABELS[phase] ?? phase ?? "";
