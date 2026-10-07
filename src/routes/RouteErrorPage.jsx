// 역할: 존재하지 않는 경로와 동적 화면 로딩 실패에 공통 오류 안내 및 복구 동작을 제공한다.
// 사용처: AppRoutes.jsx, ScreenErrorBoundary.jsx
// 담당자: 지연

export default function RouteErrorPage({
  title = '화면을 표시할 수 없습니다.',
  message = '잠시 후 다시 시도해주세요.',
  homePath = '/',
  showRetry = false,
}) {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20 }}>{title}</h1>
      <p>{message}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {showRetry && (
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        )}
        <a href={homePath}>홈으로 이동</a>
      </div>
    </main>
  );
}
