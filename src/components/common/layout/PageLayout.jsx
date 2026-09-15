/**
 * PageLayout (공통 페이지 레이아웃)
 *
 * 대부분의 화면에서 쓰는 전체 틀 컴포넌트.
 * 어떤 헤더를 쓸지는 모르고, header로 받은 걸 위에 그려주고
 * 그 아래에 각 화면의 실제 내용(children)을 넣어주는 역할만 함.
 *
 * - 화면 종류에 맞는 헤더를 쓰는 쪽에서 조합해서 넘김:
 *   <PageLayout header={<Header label="..." onBack={...} />}>       (일반 화면)
 *   <PageLayout header={<AdminHeader onLogout={...} />}>            (관리자 화면)
 *   <PageLayout>                                                     (헤더 불필요)
 *
 * ※ 스타일은 layout.module.css의 CSS Modules 클래스를 사용함
 *    (팀 컨벤션: 폴더 단위 CSS Modules 방식)
 */
import styles from './layout.module.css';

const PageLayout = ({
  header,          // 그릴 헤더 컴포넌트 (JSX). 안 넘기면 헤더 없이 렌더링
  children,        // 각 화면의 실제 내용이 들어올 자리
  className = '',  // 필요할 때 추가 스타일 넣을 수 있는 확장 포인트
}) => {
  return (
    // page-layout: 화면 전체 높이 채우고, 위(헤더)에서 아래(본문)로 세로 배치
    <div className={`${styles.pageLayout} ${className}`}>
      {header}

      {/* page-layout__main: 헤더 빼고 남은 공간을 본문이 다 차지하게 함 */}
      <main className={styles.pageLayoutMain}>{children}</main>
    </div>
  );
};

export default PageLayout;
