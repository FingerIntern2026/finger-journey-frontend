// GlobalLoading.jsx의 역할
// 전역 API 요청 로딩 상태를 화면에 보여주는 컴포넌트
// useGlobalLoading 훅으로 로딩 여부를 구독해서, 로딩 중이 아니면 아무것도 그리지 않음
// App.jsx 최상단에 한 번만 렌더링해두면 어느 페이지에서든 동작함

import { useGlobalLoading } from '../../../hooks/useGlobalLoading';
import styles from './custom.module.css';

export default function GlobalLoading() {
  const loading = useGlobalLoading();

  if (!loading) return null;

  return (
    <div className={styles.loadingOverlay} role="status" aria-live="polite">
      <div className={styles.spinner} />
    </div>
  );
}