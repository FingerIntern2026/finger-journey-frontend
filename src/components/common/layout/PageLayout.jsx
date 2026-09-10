/**
 * PageLayout (공통 페이지 레이아웃)
 *
 * 대부분의 화면(약 70%)에서 쓰는 전체 틀 컴포넌트.
 * 상단에 공통 Header를 넣고, 그 아래에 각 화면의 실제 내용(children)을 넣어주는 역할.
 *
 * - Header가 필요 없는 화면(예: 프리보딩 메인)에서는 showHeader={false}로 꺼둘 수 있음
 * - Header에 넘길 값(label, current, total, onBack)은 이 컴포넌트를 쓰는 쪽에서
 *   그대로 넘겨주면 Header까지 전달됨
 *
 * ※ 스타일은 layout.module.css의 CSS Modules 클래스를 사용함
 *    (팀 컨벤션: 폴더 단위 CSS Modules 방식)
 */
import Header from './Header';
import styles from './layout.module.css';

const PageLayout = ({
  showHeader = true,   // 헤더 보여줄지 여부 (기본값: 보여줌)
  label,               // Header에 전달할 상태 텍스트 (예: "가방 싸는 중")
  current,             // Header에 전달할 현재 단계 (오솔길 화면에서만 사용)
  total,               // Header에 전달할 전체 단계 수 (오솔길 화면에서만 사용)
  onBack,              // Header 뒤로가기 버튼에 연결할 함수
  children,            // 각 화면의 실제 내용이 들어올 자리
  className = '',      // 필요할 때 추가 스타일 넣을 수 있는 확장 포인트
}) => {
  return (
    // page-layout: 화면 전체 높이 채우고, 위(헤더)에서 아래(본문)로 세로 배치
    <div className={`${styles.pageLayout} ${className}`}>
      {/* showHeader가 true일 때만 Header를 보여주고, 받은 값들을 그대로 전달 */}
      {showHeader && (
        <Header label={label} current={current} total={total} onBack={onBack} />
      )}

      {/* page-layout__main: 헤더 빼고 남은 공간을 본문이 다 차지하게 함 */}
      <main className={styles.pageLayoutMain}>{children}</main>
    </div>
  );
};

export default PageLayout;