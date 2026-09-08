/**
 * DemoIndexPage (데모 홈 - 메뉴 화면)
 *
 * 팀 데모용 4가지 패턴(화면이동/컴포넌트리스트/다이얼로그예제/API통신)의
 * 진입점 역할만 하는 메뉴 화면. 실제 내용은 각 화면에서 보여줌.
 * (이전에 만들었던 "컴포넌트 직접 테스트" 버전에서 이 메뉴 버전으로 교체함)
 *
 *
 */
import { useNavigate } from 'react-router-dom';
// PageLayout: 공통 헤더+틀을 씌워주는 컴포넌트
import PageLayout from '../components/common/layout/PageLayout';

const DemoIndexPage = () => {
  // navigate: 버튼 눌렀을 때 다른 경로로 화면 전환시켜주는 함수
  const navigate = useNavigate();

  return (
    // showHeader={false}: 이 화면은 체크인/오솔길 같은 화면이 아니라
    // 그냥 메뉴 화면이라서, 공통 Header(뒤로가기+진행률바)는 필요 없음
    <PageLayout showHeader={false}>
      <div style={{ padding: 16 }}>

        {/* 화면 제목 */}
        <h2>핑거저니 프레임워크 데모</h2>

        {/* 화면 설명 문구. muted는 index.css에 있는 흐린 회색 텍스트 스타일 */}
        <p className="muted">
          아래 4개 버튼이 이번 과제의 핵심 산출물입니다. 각각 다른 프레임워크
          패턴을 보여줍니다.
        </p>

        {/* index-grid: index.css에 정의한 2x2 격자 배치 스타일 */}
        <div className="index-grid">

          {/* ① 화면이동 버튼 - 클릭하면 MoveGuidePage(/demo/move)로 이동 */}
          {/* base-button, base-button--primary: 기존에 정의된 초록/파랑 버튼 스타일 재사용 */}
          <button className="base-button base-button--primary" onClick={() => navigate('/demo/move')}>
            <span>①</span>화면이동
          </button>

          {/* ② 컴포넌트리스트 버튼 - 다른 파트 담당 화면으로 연결만 함 */}
          <button className="base-button base-button--primary" onClick={() => navigate('/demo/components')}>
            <span>②</span>컴포넌트리스트
          </button>

          {/* ③ 다이얼로그예제 버튼 - 파트A 담당 화면으로 연결만 함 */}
          <button className="base-button base-button--primary" onClick={() => navigate('/demo/dialog')}>
            <span>③</span>다이얼로그예제
          </button>

          {/* ④ API통신 버튼 - 파트C 담당 화면으로 연결만 함 */}
          <button className="base-button base-button--primary" onClick={() => navigate('/demo/api')}>
            <span>④</span>API통신
          </button>

        </div>
      </div>
    </PageLayout>
  );
};

export default DemoIndexPage;