// DialogContext.jsx의 역할
// 앱 전역에서 다이얼로그 상태를 "배열(스택)"로 관리하는 Context.
// 이제 하나만 뜨는 게 아니라 여러 개가 동시에 쌓일 수 있음 (예: Confirm 위에 Alert가 또 뜨는 경우).
//
// 핵심 진입점은 showDialog(type, content) — 호출하면 Promise를 반환하고,
// 사용자가 버튼을 누르면(또는 배경을 클릭하면) 그 Promise가 resolve됨.
// showAlert / showConfirm은 기존 호출부(showAlert('메시지'), showConfirm('메시지', onConfirm))가
// 그대로 동작하도록 남겨둔 "showDialog를 감싼 편의 함수"임.

import { createContext, useContext, useRef, useState } from 'react';
import DialogShell from './DialogShell.jsx';
import DialogAlert from './DialogAlert.jsx';
import DialogConfirm from './DialogConfirm.jsx';

const DialogContext = createContext(null);

export function DialogProvider({ children }) {
  // dialog 하나만 들고 있던 것 -> 여러 개를 쌓을 수 있는 배열로 변경
  const [dialogStack, setDialogStack] = useState([]);

  // showDialog가 반환한 Promise의 resolve 함수를, 어떤 다이얼로그(id)의 것인지 기억해두는 저장소
  const resolversRef = useRef(new Map());
  const nextIdRef = useRef(0);

  // 스택에서 해당 id의 다이얼로그를 제거하고, 그 Promise를 result 값으로 resolve
  const closeDialog = (id, result) => {
    setDialogStack((prev) => prev.filter((dialog) => dialog.id !== id));

    const resolve = resolversRef.current.get(id);
    if (resolve) {
      resolve(result);
      resolversRef.current.delete(id);
    }
  };

  // 회의에서 나온 핵심 함수: type(full/bottom/center)과 content를 받아서
  // 다이얼로그를 스택에 추가하고, 사용자가 응답할 때까지 기다리는 Promise를 반환
  const showDialog = (type, content, options = {}) => {
    return new Promise((resolve) => {
      const id = `dialog-${++nextIdRef.current}`;
      resolversRef.current.set(id, resolve);

      setDialogStack((prev) => [...prev, { id, type, content, options }]);
    });
  };

  // ── 기존 호출부 호환용 편의 함수 ──────────────────────────

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