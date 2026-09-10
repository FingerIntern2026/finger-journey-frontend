// DialogContext.jsx의 역할
// 앱 전역에서 Alert/Confirm 다이얼로그 상태를 관리하는 Context
// 각 페이지는 useDialog()로 showAlert/showConfirm만 호출하면 되고, 상태 관리는 여기서 전담
// ※ 이 파일은 스타일 관련 코드가 없어서 CSS Modules 전환 대상 아님 (그대로 유지)

import { createContext, useContext, useState } from 'react';
import DialogAlert from './DialogAlert.jsx';
import DialogConfirm from './DialogConfirm.jsx';

const DialogContext = createContext(null);

export function DialogProvider({ children }) {
    const [dialog, setDialog] = useState(null);

    const showAlert = (message) => {
        setDialog({ type: 'alert', message });
    };

    const showConfirm = (message, onConfirm) => {
        setDialog({ type: 'confirm', message, onConfirm });
    };

    const closeDialog = () => setDialog(null);

    return (
        <DialogContext.Provider value={{ showAlert, showConfirm }}>
            {children}

            <DialogAlert
                open={dialog?.type === 'alert'}
                message={dialog?.message}
                onClose={closeDialog}
            />

            <DialogConfirm
                open={dialog?.type === 'confirm'}
                message={dialog?.message}
                onConfirm={() => {
                    dialog?.onConfirm?.();
                    closeDialog();
                }}
                onCancel={closeDialog}
            />
        </DialogContext.Provider>
    );
}

export function useDialog() {
    return useContext(DialogContext);
}