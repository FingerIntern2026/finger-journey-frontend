// loadingStore.js의 역할
// 화면 전역에서 "지금 API 요청이 진행 중인지"를 세는 순수 기록 장부
// 여러 요청이 동시에 나가도 로딩바는 하나만 떠야 하므로, 켜고 끄는 게 아니라
// 진행 중인 요청 개수(count)를 세서 0이 될 때만 로딩이 끝난 걸로 처리함
// 화면을 다시 그릴 필요가 없는 값이라 useState 대신 모듈 스코프 변수로 관리
// (historyStack.js와 같은 방식)

let count = 0;
let listeners = [];

// 요청이 시작될 때 호출 (count 1 증가)
export function startLoading() {
  count++;
  if (count === 1) {
    // 0 → 1로 바뀌는 순간에만 구독자들에게 알림 (2, 3이 되는 건 이미 켜져있으니 알릴 필요 없음)
    notify();
  }
}

// 요청이 끝날 때 호출 (count 1 감소, 성공/실패 상관없이 항상 호출돼야 함)
export function stopLoading() {
  count = Math.max(0, count - 1); // 혹시 모를 음수 방지
  if (count === 0) {
    // 마지막 요청까지 끝나서 1 → 0이 되는 순간에만 알림
    notify();
  }
}

// 현재 로딩 중인지 여부
export function isLoading() {
  return count > 0;
}

// 구독 등록 (useGlobalLoading 훅이 사용할 예정)
export function subscribe(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

// 등록된 모든 구독자에게 현재 상태 전달
function notify() {
  listeners.forEach((fn) => fn(isLoading()));
}