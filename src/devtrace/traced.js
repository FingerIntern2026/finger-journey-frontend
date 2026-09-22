// traced.js의 역할
// 유틸 함수 하나를 감싸서, 호출될 때마다 DevTrace 흐름에 step을 남기는 래퍼.
// 원본 함수의 동작(입력→출력)은 전혀 안 바꾸고, 호출 사실만 기록함.
//
// 동기 함수(getIsLoggedIn 등)와 비동기 함수(screenConfig.fetchScreenList)를
// 둘 다 지원해야 해서, 반환값이 Promise인지 보고 분기함.

import { addStep, updateStep, markPending, safeSerialize } from './traceContext';

// name: 패널에 보일 이름 (예: "parseApiError")
// source: 파일 경로 (예: "src/utils/apiError.js") — knowledge.js 조회 키로도 씀
// fn: 원본 함수
export function traced(name, source, fn) {
  return function tracedWrapper(...args) {
    const startedAt = Date.now();

    try {
      const result = fn(...args);

      if (result && typeof result.then === 'function') {
        // 비동기: 일단 "진행 중" step을 남기고, 끝나면 결과로 patch
        const release = markPending();
        const stepId = addStep({
          layer: 'util',
          label: name,
          source,
          input: safeSerialize(args.length === 1 ? args[0] : args),
          output: '(대기 중...)',
        });

        return result.then(
          (value) => {
            updateStep(stepId, { output: safeSerialize(value), durationMs: Date.now() - startedAt });
            release();
            return value;
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
      }

      // 동기: 결과가 바로 있으니 한 번에 기록
      addStep({
        layer: 'util',
        label: name,
        source,
        input: safeSerialize(args.length === 1 ? args[0] : args),
        output: safeSerialize(result),
        durationMs: Date.now() - startedAt,
      });
      return result;
    } catch (error) {
      addStep({
        layer: 'util',
        label: name,
        source,
        input: safeSerialize(args.length === 1 ? args[0] : args),
        error: safeSerialize(error?.message ?? error),
        durationMs: Date.now() - startedAt,
      });
      throw error;
    }
  };
}
