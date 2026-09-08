// Header (공통 헤더)
//  *
//  * 체크인(가방싸기)~오솔길 세부 화면 등, 대부분의 화면 상단에 공통으로 쓰이는 헤더.
//  * - 왼쪽: 뒤로가기 버튼
//  * - 가운데: 상태 텍스트(label) + 진행률 바 (+ 오솔길 화면에서는 n/10 숫자도 표시)
//  * - 오른쪽: 새싹 아이콘
//  *
//  * 화면마다 텍스트/진행률만 다르고 구조는 동일해서, props로 값만 받아 그려주는
//  * 역할만 함. (예: 체크인 화면="가방 싸는 중", 오솔길 화면="온보딩 진행 중")
//  *
//  * ⚠️ 오솔길 메인맵 전용 헤더(FINGER ONBOARDING 배지 있는 것)는 구조가 달라서
//  *    이 컴포넌트가 아니라 별도 컴포넌트(PathMapHeader 등)로 만들어야 함.

import { ChevronLeft } from 'lucide-react';
// ↑ 왼쪽 화살표 아이콘. lucide-react 라이브러리에서 가져와요.

const Header = ({ label, current, total, onBack }) => {
  // label: 상단에 보여줄 텍스트 (예: "가방 싸는 중", "온보딩 진행 중")
  // current, total: 오솔길 화면에서만 씀 (예: current=4, total=10 → "4/10" 표시)
  //                 체크인 화면에서는 안 넘기면 자동으로 숨겨짐
  // onBack: 뒤로가기 버튼 눌렀을 때 실행할 함수. 

  // current, total이 둘 다 있으면 (현재/전체)*100으로 진행률(%) 계산
  // 둘 중 하나라도 없으면 0으로 처리
  const progress = current && total ? (current / total) * 100 : 0;

  return (
    <div className="w-full px-4 pt-4 pb-2">
      {/* 상단 줄: 왼쪽엔 라벨 텍스트, 오른쪽엔 n/10 (있을 때만) */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-700">{label}</span>

        {/* current, total 둘 다 있을 때만 이 부분이 보임 (체크인 화면엔 안 보임) */}
        {current && total && (
          <span className="text-sm text-gray-400">{current}/{total}</span>
        )}
      </div>

      {/* 하단 줄: 뒤로가기 버튼 + 진행률 바 + 새싹 아이콘 */}
      <div className="flex items-center gap-2">
        {/* 뒤로가기 버튼: 클릭하면 onBack 함수 실행 (내용은 밖에서 결정) */}
        <button onClick={onBack} aria-label="뒤로가기">
          <ChevronLeft size={20} />
        </button>

        {/* 진행률 바: 회색 배경 위에 초록색 바가 progress%만큼 채워짐 */}
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 오른쪽 새싹 아이콘 (경로는 실제 파일 확정되면 교체 필요) */}
        <img src="/icons/sprout.svg" alt="새싹" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Header;