// 역할: 전역 API 요청 로딩 상태를 화면에 보여주는 컴포넌트, loadingStore의 상태는 useGlobalLoading 훅을 통해 구독
// 사용처: App.jsx (최상단에 한 번만 렌더링해서 어느 페이지에서든 동작), ComponentListPage.jsx(데모)
// 담당자:

import { useGlobalLoading } from "../../../hooks/useGlobalLoading";
import styles from "./feedback.module.css";

export default function GlobalLoading() {
  const loading = useGlobalLoading();

  if (!loading) {
    return null;
  }

  return (
    <div
      className={styles.loadingOverlay}
      role="status"
      aria-live="polite"
    >
      <div className={styles.spinner} />
    </div>
  );
}