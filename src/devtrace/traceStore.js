// traceStore.js의 역할
// DevTrace 패널이 보여줄 "흐름(flow)" 목록을 들고 있는 저장소.
// historyStack.js와 같은 패턴 — React state가 아니라 모듈 스코프 배열로 관리하고,
// 구독자(패널 컴포넌트)에게 변경을 알려주는 방식. 클릭/네트워크/유틸 호출은
// 컴포넌트 트리 밖(axios 인터셉터, document 리스너 등)에서도 일어나기 때문에
// useState로는 애초에 이 값을 들고 있을 수가 없음.

const MAX_FLOWS = 50; // 오래된 흐름은 버림 (메모리 누수 방지)
const CLOSE_DELAY_MS = 120; // pending이 0이 된 뒤 이만큼 조용하면 흐름을 닫음

let flows = [];
let activeFlow = null;
let pendingCount = 0;
let closeTimer = null;
let nextFlowId = 0;
let nextStepId = 0;

const listeners = new Set();

function notify() {
  // flows는 항상 새 배열로 교체 (React가 참조 비교로 리렌더 여부를 판단하므로)
  listeners.forEach((listener) => listener(flows));
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getFlows() {
  return flows;
}

// 새 흐름을 열거나, 이미 진행 중인 흐름이 있으면 그걸 재사용
// origin: 'click' | 'route' | 'effect' | 'popstate'
export function beginFlow({ label, page, origin }) {
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }

  const flow = {
    id: `flow-${++nextFlowId}`,
    ts: Date.now(),
    label,
    page,
    origin,
    steps: [],
    durationMs: null,
    status: 'running',
  };

  activeFlow = flow;
  flows = [flow, ...flows].slice(0, MAX_FLOWS);
  notify();

  // 아코디언 토글처럼 addStep도 markPending도 전혀 안 부르는 "순수 로컬" 흐름은
  // 이 예약이 없으면 pendingCount가 항상 0이라 아무도 닫아주는 사람이 없어서
  // 영원히 'running' 상태로 남음. 뒤이어 진짜 비동기 작업이 시작되면
  // markPending()이 이 타이머를 다시 취소하므로 조기 종료 걱정은 없음.
  scheduleCloseIfIdle();

  return flow.id;
}

// 활성 흐름이 없는 상태에서 addStep이 불리면(예: useEffect에서 바로 API 호출),
// 그 step의 origin으로 흐름을 자동 생성함 — 클릭 없이 시작되는 흐름 대응
function ensureActiveFlow(fallbackOrigin, page) {
  if (activeFlow && activeFlow.status === 'running') return activeFlow;
  beginFlow({ label: '(자동 감지된 흐름)', page, origin: fallbackOrigin });
  return activeFlow;
}

// step 하나 추가. layer: 'api' | 'util' | 'nav' | 'dialog' | 'guard' | 'state'
export function addStep(step, { fallbackOrigin = 'effect', page = null } = {}) {
  const flow = ensureActiveFlow(fallbackOrigin, page);

  const fullStep = {
    id: `step-${++nextStepId}`,
    ts: Date.now(),
    durationMs: null,
    error: null,
    note: null,
    backend: null,
    ...step,
  };

  flow.steps = [...flow.steps, fullStep];
  flows = flows.map((f) => (f.id === flow.id ? flow : f));
  notify();

  // 동기 step(nav/dialog/guard 및 동기 util)은 markPending을 안 거치므로,
  // 여기서도 idle 타이머를 다시 걸어줘야 함 (비동기 step은 markPending이 이미 처리)
  scheduleCloseIfIdle();

  return fullStep.id;
}

// 이미 추가된 step을 나중에 업데이트 (예: API 응답이 오면 durationMs/output 채움)
export function updateStep(stepId, patch) {
  if (!activeFlow) return;
  activeFlow.steps = activeFlow.steps.map((s) => (s.id === stepId ? { ...s, ...patch } : s));
  flows = flows.map((f) => (f.id === activeFlow.id ? activeFlow : f));
  notify();
}

// 비동기 작업이 진행 중임을 표시. 반환된 함수를 호출하면 종료 처리됨.
export function markPending() {
  pendingCount += 1;
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }

  let released = false;
  return () => {
    if (released) return; // 중복 호출 방지 (StrictMode 등)
    released = true;
    pendingCount = Math.max(0, pendingCount - 1);
    scheduleCloseIfIdle();
  };
}

function scheduleCloseIfIdle() {
  if (pendingCount > 0) return;
  if (closeTimer) clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    closeActiveFlow();
    closeTimer = null;
  }, CLOSE_DELAY_MS);
}

function closeActiveFlow() {
  if (!activeFlow) return;
  const finished = activeFlow;
  finished.durationMs = Date.now() - finished.ts;
  finished.status = finished.steps.some((s) => s.error) ? 'error' : 'done';
  flows = flows.map((f) => (f.id === finished.id ? finished : f));
  activeFlow = null;
  notify();
}

export function clearFlows() {
  flows = [];
  activeFlow = null;
  notify();
}
