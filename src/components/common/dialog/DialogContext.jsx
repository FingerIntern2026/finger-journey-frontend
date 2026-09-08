// DialogContext.jsx의 역할
// 앱 전역에서 Alert/Confirm 다이얼로그 상태를 관리하는 Context
// 각 페이지는 useDialog()로 showAlert/showConfirm만 호출하면 되고, 상태 관리는 여기서 전담

import { createContext, useContext, useState } from 'react';
import DialogAlert from './DialogAlert.jsx';
import DialogConfirm from './DialogConfirm.jsx';

// Context는 리액트의 props 계단식 전달(prop drilling)을 우회하는 전역 값 저장소
// createContext(null)의 null은 Provider로 감싸지 않았을 때만 쓰이는 기본값
const DialogContext = createContext(null);

export function DialogProvider({ children }) {
    // 현재 표시 중인 다이얼로그 정보. null이면 미표시
    // Alert/Confirm은 동시 표시가 없으므로 단일 상태(dialog)로 관리하고 type 필드로 구분
    const [dialog, setDialog] = useState(null);

    const showAlert = (message) => {
        setDialog({ type: 'alert', message });
    };

    // onConfirm은 지금 실행하는 게 아니라 "나중에 확인 눌렀을 때 실행할 함수"를 잠깐 보관해두는 것
    const showConfirm = (message, onConfirm) => {
        setDialog({ type: 'confirm', message, onConfirm });
    };

    const closeDialog = () => setDialog(null);

    return (
        // value로 넘긴 것만 다른 컴포넌트에서 useContext로 꺼내 쓸 수 있음
        // dialog, closeDialog는 밖에 안 내보내서 외부에서 상태를 직접 조작 못 하게 캡슐화함
        <DialogContext.Provider value={{ showAlert, showConfirm }}>
            {children}

            {/* dialog?.type: dialog가 null이어도 에러 없이 undefined를 반환하는 옵셔널 체이닝 */}
            <DialogAlert
                open={dialog?.type === 'alert'}
                message={dialog?.message}
                onClose={closeDialog}
            />

            <DialogConfirm
                open={dialog?.type === 'confirm'}
                message={dialog?.message}
                onConfirm={() => {
                    // dialog?.onConfirm?.() : onConfirm이 존재할 때만 호출, 없으면(undefined) 그냥 통과
                    // showAlert처럼 onConfirm 없이 호출된 경우를 대비한 방어 코드
                    dialog?.onConfirm?.();
                    closeDialog();
                }}
                onCancel={closeDialog}
            />
        </DialogContext.Provider>
    );
}

// useContext(DialogContext)를 매번 쓰지 않도록 감싼 커스텀 훅
export function useDialog() {
    return useContext(DialogContext);
}