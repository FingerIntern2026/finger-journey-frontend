// traceContext.js의 역할
// DevTrace의 "공개 API" — 다른 파일(traced.js, instrument.js, 패널)은
// traceStore.js를 직접 건드리지 않고 여기를 거침.
// 1) 클릭을 흐름의 시작으로 잡는 document 캡처 리스너
// 2) 순환참조/거대 객체를 안전하게 잘라내는 직렬화 함수
// 3) traceStore 함수 재노출

import {
  beginFlow,
  addStep as addStepRaw,
  updateStep,
  markPending,
  subscribe,
  getFlows,
  clearFlows,
} from './traceStore';

export { updateStep, markPending, subscribe, getFlows, clearFlows };

// axios 에러 객체, DOM 이벤트 등은 그대로 넣으면 순환참조라 JSON.stringify가 터짐.
// 깊이 2 / 배열은 앞 3개만 / 문자열은 200자로 잘라서 패널에 보여줄 만큼만 남김.
export function safeSerialize(value, depth = 2) {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') return value.length > 200 ? value.slice(0, 200) + '…' : value;
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  if (depth <= 0) return '(생략)';

  if (Array.isArray(value)) {
    const head = value.slice(0, 3).map((v) => safeSerialize(v, depth - 1));
    return value.length > 3 ? [...head, `…외 ${value.length - 3}개`] : head;
  }

  if (typeof value === 'object') {
    // axios 에러 객체는 config/request 등에 순환참조가 있어서, 우리가 실제로 쓰는
    // 필드(response.data, message)만 뽑아서 안전하게 만듦
    const out = {};
    let count = 0;
    for (const key of Object.keys(value)) {
      if (count >= 10) {
        out['…'] = `외 ${Object.keys(value).length - 10}개 필드`;
        break;
      }
      // config/request 등 axios 내부 필드는 순환참조 위험이 커서 제외
      if (['config', 'request', '__proto__'].includes(key)) continue;
      try {
        out[key] = safeSerialize(value[key], depth - 1);
      } catch {
        out[key] = '(직렬화 실패)';
      }
      count += 1;
    }
    return out;
  }

  return String(value);
}

// 클릭된 요소(또는 조상)에서 흐름 라벨을 뽑음.
// data-trace 속성이 있으면 그걸 우선 사용, 없으면 버튼/링크 텍스트를 씀.
function resolveLabelFromTarget(target) {
  const withAttr = target.closest?.('[data-trace]');
  if (withAttr) return withAttr.getAttribute('data-trace');

  const clickable = target.closest?.('button, a, [role="button"]');
  if (clickable) {
    const text = clickable.textContent?.trim();
    if (text) return text.length > 40 ? text.slice(0, 40) + '…' : text;
  }

  return null;
}

let installed = false;

// document 캡처 단계에서 모든 클릭을 가로채 흐름을 엶.
// 캡처 단계를 쓰는 이유: 버블링 중간에 stopPropagation()을 만나도(예: 다이얼로그
// 박스 클릭 시 DialogShell.jsx의 handleContentClick) 흐름 시작만큼은 항상 잡기 위함.
export function installClickCapture() {
  if (installed) return; // StrictMode/재마운트 시 중복 설치 방지
  installed = true;

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;

      // DevTrace 패널 자체(흐름 카드 펼치기, 필터 버튼 등)를 클릭한 건 사용자가
      // "우리 앱"을 조작한 게 아니므로 무시. 안 걸러내면 패널이 자기 자신을
      // 계측 대상으로 착각해서 클릭할 때마다 가짜 흐름을 만들어내는 무한루프가 생김.
      if (target.closest?.('[data-devtrace-root]')) return;

      const label = resolveLabelFromTarget(target);
      if (!label) return; // 버튼/링크/data-trace가 아닌 클릭(빈 공간 등)은 흐름을 안 엶

      beginFlow({
        label,
        page: window.location.pathname,
        origin: 'click',
      });
    },
    { capture: true }
  );
}

export function addStep(step, options) {
  return addStepRaw(step, { ...options, page: options?.page ?? window.location.pathname });
}
