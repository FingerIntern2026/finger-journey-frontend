// instrument.js의 역할
// DevTrace 계측을 앱 시작 시 한 번 설치하는 진입점.
// - 클릭 캡처 설치 (흐름 시작점)
// - window.fetch 패치 (챗봇이 axios가 아니라 raw fetch로 AI 서버를 직접 호출하기 때문에,
//   api/client.js의 axios 인터셉터로는 못 잡음 — 앱 전체에서 이 fetch 하나가 유일한 예외)
//
// Spring API(axios) 계측은 여기가 아니라 src/api/client.js에 직접 인터셉터로 붙어있음
// (그쪽이 baseURL/인스턴스를 이미 들고 있어서 가장 깨끗한 지점).

import { addStep, updateStep, markPending, safeSerialize, installClickCapture } from './traceContext';
import { findEndpointKnowledge } from './knowledge';

let installed = false;

export function installDevTrace() {
  if (installed) return; // StrictMode 이중 실행 방지
  installed = true;

  installClickCapture();
  patchFetch();
}

function patchFetch() {
  const originalFetch = window.fetch.bind(window);

  window.fetch = (input, init = {}) => {
    const url = typeof input === 'string' ? input : input?.url ?? '';

    // AI 서버(챗봇)로 가는 요청만 계측. 그 외 fetch(예: 브라우저 확장 프로그램 등)는 원본 그대로.
    const isAiServerCall = url.includes(':8000');
    if (!isAiServerCall) {
      return originalFetch(input, init);
    }

    const startedAt = Date.now();
    const knowledge = findEndpointKnowledge(new URL(url, window.location.origin).pathname);
    let requestBody = null;
    try {
      requestBody = init.body ? JSON.parse(init.body) : null;
    } catch {
      requestBody = init.body ?? null;
    }

    const release = markPending();
    const stepId = addStep({
      layer: 'api',
      label: `${init.method ?? 'GET'} ${url}`,
      source: 'ChatPanel.jsx (raw fetch — Spring 미경유)',
      input: safeSerialize(requestBody),
      output: '(응답 대기 중...)',
      backend: knowledge?.backend ?? null,
      note: knowledge?.note ?? null,
    });

    return originalFetch(input, init).then(
      async (response) => {
        let body = null;
        try {
          body = await response.clone().json();
        } catch {
          body = null;
        }
        updateStep(stepId, {
          output: safeSerialize(body),
          durationMs: Date.now() - startedAt,
          error: response.ok ? null : `HTTP ${response.status}`,
        });
        release();
        return response;
      },
      (error) => {
        updateStep(stepId, {
          error: safeSerialize(error?.message ?? error),
          durationMs: Date.now() - startedAt,
        });
        release();
        throw error;
      }
    );
  };
}
