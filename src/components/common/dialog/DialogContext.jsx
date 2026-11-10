// 역할: 앱 전역에서 다이얼로그 상태를 배열(스택)로 관리하는 Context와 Provider.
// 브라우저 뒤로가기를 누르면 가장 위의 다이얼로그부터 닫는다.
// 사용처: App.jsx, hooks/useDialog.js
// 담당자: 김재웅

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DialogShell from './DialogShell.jsx';
import DialogAlert from './DialogAlert.jsx';
import DialogConfirm from './DialogConfirm.jsx';
import DialogContext from './dialogContextValue.js';

export function DialogProvider({ children }) {
  const [dialogStack, setDialogStack] = useState([]);
  const resolversRef = useRef(new Map());
  const nextIdRef = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  // 다이얼로그를 열 때마다 history 항목에 현재 깊이를 기록한다.
  const dialogDepth = location.state?.dialogDepth ?? 0;
  const previousDepthRef = useRef(dialogDepth);

  // 버튼 클릭 / 배경 클릭 등 "사용자 조작"으로 특정 id를 닫을 때
  const closeDialog = (id, result) => {
    // 이 다이얼로그가 열릴 때 history에 쌓아둔 항목 하나를 되돌림
    navigate(-1);

    setDialogStack((prev) => prev.filter((dialog) => dialog.id !== id));
    const resolve = resolversRef.current.get(id);
    if (resolve) {
      resolve(result);
      resolversRef.current.delete(id);
    }
  };

  // 다이얼로그가 열릴 때마다 같은 주소로 history 항목을 하나 쌓아둠
  const showDialog = (type, content, options = {}) => {
    return new Promise((resolve) => {
      const id = `dialog-${++nextIdRef.current}`;
      resolversRef.current.set(id, resolve);

      navigate(location.pathname, {
        state: { ...location.state, dialogDepth: dialogStack.length + 1 },
      });
      setDialogStack((prev) => [...prev, { id, type, content, options }]);
    });
  };

  // 브라우저 뒤로가기로 깊이가 줄어들면 위쪽 다이얼로그를 결과 없이(null) 닫음
  useEffect(() => {
    const isDepthReduced = dialogDepth < previousDepthRef.current;
    previousDepthRef.current = dialogDepth;

    if (!isDepthReduced) return;

    setDialogStack((prev) => {
      prev.slice(dialogDepth).forEach((dialog) => {
        resolversRef.current.get(dialog.id)?.(null);
        resolversRef.current.delete(dialog.id);
      });
      return prev.slice(0, dialogDepth);
    });
  }, [dialogDepth]);

  // 다이얼로그가 떠 있는 동안 배경 페이지는 현재 위치에 고정한다.
  // 바텀 시트처럼 내부가 긴 다이얼로그는 DialogShell의 box만 스크롤되고,
  // 휠/터치 스크롤이 뒤쪽 화면으로 전달되지 않게 한다.
  useEffect(() => {
    if (dialogStack.length === 0) return undefined;

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    const previousHtmlOverflow = documentElement.style.overflow;

    documentElement.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      body.style.overflow = previousBodyStyles.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [dialogStack.length]);

  // ── 편의 함수 (4단계와 동일) ──────────────────────────

  const showAlert = (message) => {
    return showDialog('center', ({ close }) => (
      <DialogAlert message={message} onConfirm={() => close(true)} />
    ));
  };

  const showConfirm = (message, onConfirm, options = {}) => {
    return showDialog('center', ({ close }) => (
      <DialogConfirm
        message={message}
        onConfirm={async () => {
          await onConfirm?.();
          close(true);
        }}
        onCancel={() => close(false)}
        {...options}
      />
    ));
  };

  return (
    <DialogContext.Provider value={{ showDialog, showAlert, showConfirm }}>
      {children}

      {dialogStack.map((dialog, index) => {
        const DialogContent = dialog.content;

        return (
          <DialogShell
            key={dialog.id}
            type={dialog.type}
            isTop={index === dialogStack.length - 1}
            onClose={(result) => closeDialog(dialog.id, result)}
          >
            <DialogContent close={(result) => closeDialog(dialog.id, result)} />
          </DialogShell>
        );
      })}
    </DialogContext.Provider>
  );
}
