const ASSET_PATH = "/assets/pth/quiz";

export const QUIZ_STEPS = {
  PTH_QUZ_C01: {
    group: "음식",
    title: "커피 취향",
    prompt: "어떤 커피를 좋아하시나요?",
    image: `${ASSET_PATH}/coffee.png`,
    options: ["아메리카노", "라떼", "달달한 음료", "커피 안 마셔요"],
    nextCode: "PTH_QUZ_C02",
  },
  PTH_QUZ_C02: {
    group: "음식",
    title: "점심 취향",
    prompt: "어떤 점심 메뉴를 좋아하시나요?",
    image: `${ASSET_PATH}/lunch.png`,
    options: ["한식", "양식", "중식", "일식"],
    nextCode: "PTH_QUZ_C03",
  },
  PTH_QUZ_C03: {
    group: "음식",
    title: "맵기 레벨",
    prompt: "어떤 맵기를 잘 드시나요?",
    image: `${ASSET_PATH}/spicy.png`,
    options: ["못 먹어요", "살짝 매운맛(신라면)", "매운맛(불닭)", "매운맛 러버"],
    nextCode: "PTH_QUZ_C04",
  },
  PTH_QUZ_C04: { group: "음식", clear: true, image: `${ASSET_PATH}/clear-river.png` },
  PTH_QUZ_C05: {
    group: "휴식",
    title: "쉬는 날",
    prompt: "쉬는 날을 어떻게 보내시나요?",
    image: `${ASSET_PATH}/day-off.png`,
    options: ["집에서 충전", "맛집 · 카페", "운동", "여행 · 나들이"],
    nextCode: "PTH_QUZ_C06",
  },
  PTH_QUZ_C06: {
    group: "휴식",
    title: "좋아하는 계절",
    prompt: "어떤 계절을 좋아하시나요?",
    image: `${ASSET_PATH}/season.png`,
    options: ["봄", "여름", "가을", "겨울"],
    nextCode: "PTH_QUZ_C07",
  },
  PTH_QUZ_C07: {
    group: "휴식",
    title: "여행 스타일",
    prompt: "여행은 어떻게 즐기시나요?",
    image: `${ASSET_PATH}/travel.png`,
    options: ["계획형", "즉흥형", "맛집 중심", "휴양 중심"],
    nextCode: "PTH_QUZ_C08",
  },
  PTH_QUZ_C08: { group: "휴식", clear: true, image: `${ASSET_PATH}/clear-bear.png` },
  PTH_QUZ_C09: {
    group: "협업",
    title: "친해지는 방법",
    prompt: "어떻게 다가가면 가장 편하신가요?",
    image: `${ASSET_PATH}/getting-close.png`,
    options: ["먼저 말 걸어주세요", "밥 같이 먹어요", "커피 좋아요", "천천히 친해져요"],
    nextCode: "PTH_QUZ_C10",
  },
  PTH_QUZ_C10: {
    group: "협업",
    title: "출근할 때 듣는 것",
    prompt: "출근길에는 주로 뭘 하시나요?",
    image: `${ASSET_PATH}/commute.png`,
    options: ["음악", "유튜브 · 팟캐스트", "아무것도 안 들음", "자는 편"],
    nextCode: "PTH_QUZ_C11",
  },
  PTH_QUZ_C11: {
    group: "협업",
    title: "협업 스타일",
    prompt: "함께 일할 때 어떤 방식이 편하신가요?",
    image: `${ASSET_PATH}/collaboration.png`,
    options: ["바로 이야기하기", "메신저 선호", "같이 모여 공유하기", "먼저 생각한 뒤 이야기"],
    nextCode: "PTH_QUZ_C12",
  },
  PTH_QUZ_C12: { group: "협업", clear: true, image: `${ASSET_PATH}/clear-log.png` },
};

export function getQuizStep(code) {
  return QUIZ_STEPS[code] ?? QUIZ_STEPS.PTH_QUZ_C01;
}
