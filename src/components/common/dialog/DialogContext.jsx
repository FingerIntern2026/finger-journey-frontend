// DialogContext.jsx의 역할
// 앱 전역에서 다이얼로그 상태를 "배열(스택)"로 관리하는 Context.
// + 브라우저 뒤로가기를 누르면 스택의 가장 마지막(맨 위) 다이얼로그부터 순서대로 닫히게 처리.

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import DialogShell from './DialogShell.jsx';
import DialogAlert from './DialogAlert.jsx';
import DialogConfirm from './DialogConfirm.jsx';
import { addStep } from '../../../devtrace/traceContext';

const DialogContext = createContext(null);

export function DialogProvider({ children }) {
  const [dialogStack, setDialogStack] = useState([]);
  const resolversRef = useRef(new Map());
  const nextIdRef = useRef(0);

  // 다음 popstate 이벤트를 "내가 직접 일으킨 것"으로 간주하고 무시할지 여부
  // (버튼/배경 클릭으로 닫을 때 history.back()을 직접 호출하는데, 그때 생기는
  //  popstate까지 "사용자가 뒤로가기 눌렀다"로 착각해서 또 닫으면 안 되니까)
  const skipNextPopStateRef = useRef(false);

  // 스택 맨 위(마지막) 다이얼로그를 찾아서 resolve + 제거하는 내부 헬퍼
  const closeTopOfStack = (result) => {
    setDialogStack((prev) => {
      if (prev.length === 0) return prev;
      const top = prev[prev.length - 1];
      const resolve = resolversRef.current.get(top.id);
      if (resolve) {
        resolve(result);
        resolversRef.current.delete(top.id);
      }
      return prev.slice(0, -1);
    });
  };

  // 버튼 클릭 / 배경 클릭 등 "사용자 조작"으로 특정 id를 닫을 때
  const closeDialog = (id, result) => {
    // 이 다이얼로그가 열릴 때 history에 쌓아둔 항목 하나를 되돌림
    skipNextPopStateRef.current = true;
    window.history.back();

    addStep({
      layer: 'dialog',
      label: `closeDialog(${id})`,
      source: 'src/components/common/dialog/DialogContext.jsx',
      output: { result },
      note: 'history.back()으로 pushState했던 항목을 되돌림 (skipNextPopStateRef로 popstate 핸들러 중복 실행 방지)',
    });

    setDialogStack((prev) => prev.filter((dialog) => dialog.id !== id));
    const resolve = resolversRef.current.get(id);
    if (resolve) {
      resolve(result);
      resolversRef.current.delete(id);
    }
  };

  // 다이얼로그가 열릴 때마다 history 항목을 하나 쌓아둠
  // → 나중에 popstate 한 번 = 다이얼로그 하나 닫힘, 이 대응 관계가 핵심
  const showDialog = (type, content, options = {}) => {
    return new Promise((resolve) => {
      const id = `dialog-${++nextIdRef.current}`;
      resolversRef.current.set(id, resolve);

      window.history.pushState({ dialogId: id }, '');
      addStep({
        layer: 'dialog',
        label: `showDialog('${type}')`,
        source: 'src/components/common/dialog/DialogContext.jsx',
        note: 'history.pushState로 히스토리 항목을 하나 쌓음 — 이후 popstate 한 번 = 다이얼로그 하나 닫힘',
      });
      setDialogStack((prev) => [...prev, { id, type, content, options }]);
    });
  };

  // 실제 브라우저 뒤로가기(popstate)를 감지해서, 스택 맨 위 것만 닫음
  useEffect(() => {
    const handlePopState = () => {
      if (skipNextPopStateRef.current) {
        // closeDialog에서 우리가 직접 발생시킨 popstate → 무시
        skipNextPopStateRef.current = false;
        return;
      }
      // 진짜 사용자가 뒤로가기를 누른 경우 → 결과 없이(null) 닫음
      addStep({
        layer: 'dialog',
        label: 'popstate → closeTopOfStack(null)',
        source: 'src/components/common/dialog/DialogContext.jsx',
        note: '물리적 뒤로가기 버튼 — DOM 클릭이 아니라 브라우저 이벤트로 다이얼로그가 닫힘',
      }, { fallbackOrigin: 'popstate' });
      closeTopOfStack(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ── 편의 함수 (4단계와 동일) ──────────────────────────

  const showAlert = (message) => {
    return showDialog('center', ({ close }) => (
      <DialogAlert message={message} onConfirm={() => close(true)} />
    ));
  };

  const showConfirm = (message, onConfirm) => {
    return showDialog('center', ({ close }) => (
      <DialogConfirm
        message={message}
        onConfirm={async () => {
          await onConfirm?.();
          close(true);
        }}
        onCancel={() => close(false)}
      />
    ));
  };

  return (
    <DialogContext.Provider value={{ showDialog, showAlert, showConfirm }}>
      {children}

      {dialogStack.map((dialog, index) => (
        <DialogShell
          key={dialog.id}
          type={dialog.type}
          isTop={index === dialogStack.length - 1}
          onClose={(result) => closeDialog(dialog.id, result)}
        >
          {dialog.content({ close: (result) => closeDialog(dialog.id, result) })}
        </DialogShell>
      ))}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}