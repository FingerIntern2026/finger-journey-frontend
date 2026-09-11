/**
 * MoveGuidePage (이동안내 페이지, "/demo/move")
 *
 * "화면이동" 패턴을 보여주는 3개 하위 예제로 가는 진입 화면.
 * - 권한검사 → 지연님(파트B) 담당, AuthCheckPage.jsx
 * - 파라미터전달 / 뒤로가기 → 파트C 담당 페이지로 연결만 함
 *
 * 로그인 상태 토글이 AuthCheckPage가 아니라 여기 있는 이유 (재웅/규원님 피드백):
 * AuthCheckPage는 ProtectedRoute로 감싸여 있어서, 로그인 안 된 상태면 화면
 * 자체가 안 그려지고 여기로 돌아와버림 → 토글은 "들어가기 전" 화면에 있어야
 * 로그인 O/X 두 경우 다 테스트 가능함
 */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// PageLayout: 공통 틀을 씌워주는 컴포넌트 (지연님이 만든 그 파일)
import PageLayout from '../../components/common/layout/PageLayout.jsx';
import Header from '../../components/common/layout/Header.jsx';
import BaseButton from '../../components/common/base/BaseButton.jsx';

const MoveGuidePage = () => {
  // navigate: 버튼 눌렀을 때 다른 경로로 이동시켜주는 함수
  // (예: navigate('/demo/move/auth-check') → 그 경로로 화면 전환)
  const navigate = useNavigate();

  // ProtectedRoute가 로그인 안 된 상태에서 이 화면으로 돌려보낼 때
  // state에 blockedReason을 실어서 넘겨줌 -> 그 값을 꺼내서 안내 문구로 보여줌
  const location = useLocation();
  const blockedReason = location.state?.blockedReason;

  // isLoggedIn: 지금 로그인된 걸로 칠지 아닐지 저장하는 상태값
  // 처음 화면 켤 때, localStorage에 이미 저장된 값이 있으면 그걸로 시작함
  // (useAuth.js가 읽는 것과 똑같은 'isLoggedIn'이라는 이름을 써야 서로 연동됨)
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // 토글 스위치를 켜거나 끌 때 실행되는 함수
  const handleToggle = (e) => {
    const next = e.target.checked; // 스위치를 켰으면 true, 껐으면 false
    setIsLoggedIn(next); // 화면에 보이는 상태 업데이트
    // localStorage에도 저장해야 useAuth.js, ProtectedRoute가 같은 값을 보고 판단할 수 있음
    // (localStorage는 문자열만 저장 가능해서 true/false를 String()으로 감싸줌)
    localStorage.setItem('isLoggedIn', String(next));
  };

  return (
    // PageLayout으로 전체 틀 씌우기. header에 넘긴 Header가 제목+뒤로가기를 그림
    // navigate(-1) = "브라우저 뒤로가기 버튼 누른 것"과 같은 효과 (한 페이지 전으로 이동)
    <PageLayout header={<Header label="화면이동 예제" onBack={() => navigate(-1)} />}>
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
            <input type="checkbox" checked={isLoggedIn} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
        </div>

        {/* 3개 링크 버튼 목록 */}
        <div className="link-list">
          <BaseButton
            label={<>권한검사 <span>›</span></>}
            variant="ghost"
            fullWidth
            onClick={() => navigate('/demo/move/auth-check')}
          />
          <BaseButton
            label={<>파라미터전달 <span>›</span></>}
            variant="ghost"
            fullWidth
            onClick={() => navigate('/demo/move/param')}
          />
          <BaseButton
            label={<>뒤로가기 <span>›</span></>}
            variant="ghost"
            fullWidth
            onClick={() => navigate('/demo/move/go-back')}
          />
        </div>

      </div>
    </PageLayout>
  );
};

export default MoveGuidePage;