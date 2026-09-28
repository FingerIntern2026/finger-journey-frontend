// 페이지명: GoBackExamplePage (TODO: 정식 화면명 확정되면 교체)
// 역할: "뒤로가기" 데모 화면. useNavigation.js의 goBack()으로 이전 페이지로 이동하고,
//       히스토리가 없을 때는 goToScreen()으로 대체 이동 처리. 페이지 이동은 반드시 이 훅을 통해서만
//       수행함 (React Router 원본 함수 직접 사용 금지)
// 사용처: MoveGuidePage에서 "뒤로가기" 버튼(goToScreen(SCREEN_CODES.DEMO_GO_BACK))으로 진입
// url: /demo/move/go-back
// 담당자:

import useNavigation from "../../hooks/useNavigation";
import { SCREEN_CODES } from "../../config/screenCodes";
import PageLayout from "../../components/common/layout/PageLayout.jsx";
import Header from "../../components/common/layout/Header.jsx";

export default function GoBackExamplePage() {
  const { goBack, goToScreen, goBackN } = useNavigation();

  return (
    <PageLayout header={<Header label="뒤로가기 데모" onBack={goBack} />}>
    <div style={{ padding: 24 }}>
      <p>
        아래 버튼을 누르면 이 화면으로 들어오기 직전 페이지로 돌아갑니다.
      </p>

      <button onClick={goBack}>뒤로가기</button>

      <p style={{ marginTop: "12px", color: "gray" }}>
        (만약 이 페이지에 직접 들어와서 뒤로 갈 곳이 없다면, 아래 버튼으로
        데모 목록으로 이동하세요.)
      </p>
      <button onClick={() => goToScreen(SCREEN_CODES.DEMO_HOME)}>데모 목록으로</button>

      <hr style={{ margin: "20px 0" }} />

      <p>
        아래 버튼은 화면정보 규칙(TARGET/EXIT/BLOCK)과 무관하게, 히스토리 기록을
        한 번에 2칸 되돌립니다. 이 화면은 항상 홈→화면이동→여기(2단계)로
        들어오므로, 누르면 중간(화면이동)을 건너뛰고 홈으로 바로 이동합니다.
      </p>
      <button onClick={() => goBackN(2)}>2칸 한번에 뒤로가기 (goBackN)</button>
    </div>
    </PageLayout>
  );
}
