/**
 * AuthCheckPage (권한검사 페이지, "/demo/move/auth-check")

 *
 * 로그인 안 됐으면 ProtectedRoute가 MoveGuidePage로 돌려보내기 때문에,
 * 이 화면이 보인다는 것 자체가 이미 로그인된 상태라는 뜻.
 * 토글은 MoveGuidePage에 있음
 */
import { useNavigate } from 'react-router-dom';
// PageLayout: 공통 헤더+틀을 씌워주는 컴포넌트
import PageLayout from '../../components/common/layout/PageLayout.jsx';
// useAuth: 파트A(재웅님)가 만든 훅. localStorage의 로그인 상태를 읽어서
// { isLoggedIn: true/false } 형태로 돌려줌
import { useAuth } from '../../hooks/useAuth.js';
import BaseBadge from '../../components/common/base/BaseBadge.jsx';

const AuthCheckPage = () => {
  // navigate: 뒤로가기 버튼 눌렀을 때 이전 화면으로 이동시키는 함수
  const navigate = useNavigate();

  // 지금 로그인 상태를 useAuth 훅으로 읽어옴
  // (여기까지 화면이 보였다는 건 ProtectedRoute를 이미 통과했다는 뜻이라
  //  사실상 항상 true겠지만, "진짜 값을 잘 읽어오는지" 눈으로 보여주기 위해 표시함)
  const { isLoggedIn } = useAuth();

  return (
    // PageLayout으로 전체 틀 씌우기. onBack에는 뒤로가기 동작 연결
    <PageLayout label="권한검사 예제" onBack={() => navigate(-1)}>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* isLoggedIn 값에 따라 초록/회색 뱃지를 다르게 보여줌 */}
        {/* base-badge, base-badge--green/gray는 index.css에 정의된 기존 스타일 재사용 */}
        {isLoggedIn ? (
          <BaseBadge label="로그인됨" color="green" />
        ) : (
          <BaseBadge label="로그인 안 됨" color="gray" />
        )}

        {/* 상태에 맞는 설명 문구도 같이 보여줌 (디버깅/데모 목적) */}
        <p className="muted">
          {isLoggedIn
            ? 'ProtectedRoute 통과 — 이 화면이 정상 노출됩니다.'
            : 'useAuth가 false를 반환 → ProtectedRoute가 화면 진입을 막습니다.'}
        </p>

      </div>
    </PageLayout>
  );
};

export default AuthCheckPage;