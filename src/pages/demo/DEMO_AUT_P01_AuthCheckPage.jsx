// 페이지명: AuthCheckPage (TODO: 정식 화면명 확정되면 교체)
// 역할: MoveGuidePage에서 설정한 로그인 상태값을 같은 저장소에서 읽는 권한 상태 확인 데모.
// 사용처: MoveGuidePage에서 "권한검사" 버튼(goToScreen(SCREEN_CODES.DEMO_AUTH_CHECK))으로 진입.
// url: /demo/move/auth-check
// 담당자:

// PageLayout: 공통 틀을 씌워주는 컴포넌트
import PageLayout from '../../components/common/layout/PageLayout.jsx';
import Header from '../../components/common/layout/Header.jsx';
// useAuth: 파트A(재웅님)가 만든 훅. localStorage의 로그인 상태를 읽어서
// { isLoggedIn: true/false } 형태로 돌려줌
import { useAuth } from '../../hooks/useAuth.js';
import useNavigation from '../../hooks/useNavigation';
import BaseBadge from '../../components/common/base/BaseBadge.jsx';

const AuthCheckPage = () => {
  const { goBack } = useNavigation();

  // 지금 로그인 상태를 useAuth 훅으로 읽어옴
  const { isLoggedIn } = useAuth();

  return (
    // PageLayout으로 전체 틀 씌우기. onBack에는 뒤로가기 동작 연결
    <PageLayout header={<Header label="권한검사 예제" onBack={goBack} />}>
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
            ? 'useAuth가 로그인 상태를 true로 읽었습니다.'
            : 'useAuth가 로그인 상태를 false로 읽었습니다.'}
        </p>

      </div>
    </PageLayout>
  );
};

export default AuthCheckPage;
