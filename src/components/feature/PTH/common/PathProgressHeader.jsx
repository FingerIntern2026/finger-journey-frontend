// 역할: 오솔길 세부 화면 상단의 "온보딩 진행 중 n/9" 헤더. 숫자는 화면마다 고정값이 아니라
//       서버의 내 진행 상태(완료한 스테이지 수)를 보여준다.
//       extra는 3행시를 저장한 뒤 화면처럼, 서버 스테이지 밖의 진행을 더해서 보여줄 때 쓴다.
// 사용처: PTH 각 Feature의 PageLayout header prop
// 담당자: 김재웅

import Header from "./Header";
import usePathProgress from "./usePathProgress";

export default function PathProgressHeader({ onBack, extra = 0 }) {
  const { completed, total } = usePathProgress();

  return <Header label="온보딩 진행 중" current={Math.min(completed + extra, total)} total={total} onBack={onBack} />;
}
