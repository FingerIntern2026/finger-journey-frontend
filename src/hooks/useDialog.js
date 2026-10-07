// 역할: DialogContext가 제공하는 showDialog, showAlert, showConfirm을 React 컴포넌트에서 사용할 수 있도록 연결하는 커스텀 훅.

import { useContext } from "react";
import {
  DialogContext,
} from "../components/common/dialog/DialogContext";

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error(
      "useDialog는 DialogProvider 내부에서 사용해야 합니다."
    );
  }

  return context;
}