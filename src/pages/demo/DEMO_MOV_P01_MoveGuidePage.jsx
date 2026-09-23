// 페이지명: MoveGuidePage (TODO: 정식 화면명 확정되면 교체)
// 역할: "화면이동" 패턴을 보여주는 3개 하위 예제(권한검사/파라미터전달/뒤로가기)로 가는 진입 화면.
//       - 권한검사(AuthCheckPage.jsx)는 지연님(파트B), 파라미터전달/뒤로가기는 파트C 담당 페이지로 연결만 함
//       - 로그인 상태 토글이 AuthCheckPage가 아니라 여기 있는 이유(재웅/규원님 피드백):
//         AuthCheckPage는 ProtectedRoute로 감싸여 있어서 로그인 안 된 상태면 화면 자체가
//         안 그려지고 여기로 돌아와버림 → 토글은 "들어가기 전" 화면에 있어야 로그인 O/X
//         두 경우 다 테스트 가능함
// 사용처: DemoIndexPage에서 "① 화면이동" 버튼(goToScreen(SCREEN_CODES.DEMO_MOVE))으로 진입.
//         권한검사/파라미터전달/뒤로가기 3개 버튼으로 하위 페이지로 이동시키며,
//         ProtectedRoute에 막힌 AuthCheckPage 접근도 blockedReason state와 함께 이 화면으로 돌아옴
// url: /demo/move
// 담당자:

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// PageLayout: 공통 틀을 씌워주는 컴포넌트 (지연님이 만든 그 파일)
import PageLayout from '../../components/common/layout/PageLayout.jsx';
import Header from '../../components/common/layout/Header.jsx';
import BaseButton from '../../components/common/base/BaseButton.jsx';
import { SCREEN_CODES } from '../../config/screenCodes';
import useNavigation from '../../hooks/useNavigation';
import { getIsLoggedIn, setIsLoggedIn as saveIsLoggedIn } from '../../utils/authStorage';

const MoveGuidePage = () => {
  const { goBack, goToScreen } = useNavigation();

  // ProtectedRoute가 로그인 안 된 상태에서 이 화면으로 돌려보낼 때
  // state에 blockedReason을 실어서 넘겨줌 -> 그 값을 꺼내서 안내 문구로 보여줌
  const location = useLocation();
  const blockedReason = location.state?.blockedReason;

  // isLoggedIn: 지금 로그인된 걸로 칠지 아닐지 저장하는 상태값
  // 처음 화면 켤 때, authStorage에 이미 저장된 값이 있으면 그걸로 시작함
  // (useAuth.js가 읽는 것과 같은 authStorage를 거쳐야 서로 연동됨)
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());

  // 토글 스위치를 켜거나 끌 때 실행되는 함수
  const handleToggle = (e) => {
    const next = e.target.checked; // 스위치를 켰으면 true, 껐으면 false
    setIsLoggedIn(next); // 화면에 보이는 상태 업데이트
    // authStorage에도 저장해야 useAuth.js, ProtectedRoute가 같은 값을 보고 판단할 수 있음
    saveIsLoggedIn(next);
  };

  return (
    // PageLayout으로 전체 틀 씌우기. header에 넘긴 Header가 제목+뒤로가기를 그림
    <PageLayout header={<Header label="화면이동 예제" onBack={goBack} />}>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* 화면 설명 문구 */}
        <p className="muted">아래 3개는 각각 다른 라우팅 패턴을 보여줍니다.</p>

        {/* ProtectedRoute에 의해 튕겨져 왔을 때만 보이는 안내 메시지 */}
        {blockedReason && (
          <p style={{ color: '#e5484d', fontSize: 13 }}>⚠ {blockedReason}</p>
        )}

        {/* 로그인 상태 토글 영역 */}
        <div className="toggle-row">
          <span className="muted">로그인 상태 시뮬레이션</span>
          <label className="switch">
            {/* checked={isLoggedIn}: 지금 상태값에 맞춰 스위치 위치를 보여줌 */}
            {/* onChange={handleToggle}: 스위치 클릭하면 위에서 만든 함수 실행 */}
            <input
              type="checkbox"
              checked={isLoggedIn}
              onChange={handleToggle}
              data-trace="로그인 토글 → authStorage.setIsLoggedIn()"
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* 3개 링크 버튼 목록 */}
        <div className="link-list">
          <BaseButton
            label={<>권한검사 <span>›</span></>}
            variant="ghost"
            fullWidth
            onClick={() => goToScreen(SCREEN_CODES.DEMO_AUTH_CHECK)}
            data-trace="goToScreen(DEMO_AUT_P01)"
          />
          <BaseButton
            label={<>파라미터전달 <span>›</span></>}
            variant="ghost"
            fullWidth
            onClick={() => goToScreen(SCREEN_CODES.DEMO_PARAM_PASS)}
            data-trace="goToScreen(DEMO_PRM_P01)"
          />
          <BaseButton
            label={<>뒤로가기 <span>›</span></>}
            variant="ghost"
            fullWidth
            onClick={() => goToScreen(SCREEN_CODES.DEMO_GO_BACK)}
            data-trace="goToScreen(DEMO_MOV_P02)"
          />
        </div>

      </div>
    </PageLayout>
  );
};

export default MoveGuidePage;
