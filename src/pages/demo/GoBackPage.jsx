// GoBackPage.jsx의 역할
// "뒤로가기" 데모 화면
// useNavigation.js의 goBack()으로 이전 페이지로 이동
// useNavigation.js의 goTo()로 히스토리가 없을 때 대체 이동 처리
// 페이지 이동은 반드시 이 훅을 통해서만 수행 (React Router 원본 함수 직접 사용 금지)

import useNavigation from "../../hooks/useNavigation";

export default function GoBackPage() {
  const { goBack, goTo } = useNavigation();

  return (
    <div>
      <h2>뒤로가기 데모</h2>
      <p>
        아래 버튼을 누르면 이 화면으로 들어오기 직전 페이지로 돌아갑니다.
      </p>

      <button onClick={goBack}>뒤로가기</button>

      <p style={{ marginTop: "12px", color: "gray" }}>
        (만약 이 페이지에 직접 들어와서 뒤로 갈 곳이 없다면, 아래 버튼으로
        데모 목록으로 이동하세요.)
      </p>
      <button onClick={() => goTo("/demo")}>데모 목록으로</button>
    </div>
  );
}