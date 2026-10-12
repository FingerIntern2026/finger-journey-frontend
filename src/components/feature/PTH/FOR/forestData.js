const ASSET_PATH = "/assets/pth/forest-guide";

export const FOREST_GUIDES = [
  {
    title: "핑거의 독자적인\n모바일 업무관리 플랫폼입니다.",
    image: `${ASSET_PATH}/forest-pms.png`,
    imageAlt: "구성원들이 모바일 포레스트 PMS를 사용하는 모습",
    bullets: [
      "매일 업무일지를 작성하고",
      "보상으로 열매를 받고",
      "동료에게 씨앗을 선물하며 감사와 칭찬을 전하고",
      "한 달간 모인 열매의 절반은 사회에 기부되고, 절반은 월급으로 지급됩니다.",
    ],
  },
  {
    title: "매일 업무일지를 작성해요!",
    image: `${ASSET_PATH}/work-log.png`,
    imageAlt: "구성원이 화분 옆에서 업무일지를 작성하는 모습",
    description: "프로젝트, 참여율, 일지내용을 입력하고\n필요하면 칭찬하거나 씨앗 선물을 추가할 수 있어요.",
    tags: ["업무일지 작성", "칭찬하기", "씨앗선물"],
  },
  {
    title: "보상으로 열매를 받아요!",
    image: `${ASSET_PATH}/fruit-reward.png`,
    imageAlt: "구성원이 보상으로 받은 빨간 열매를 들고 있는 모습",
    bullets: ["칭찬하기: 기본 3개", "업무승인: 승인 열매 지급"],
    description: "받은 열매는 내 열매로 적립되어,\n다른 동료에게 다시 선물할 수 있어요.",
    tip: "열매를 받으면 나의 열매가 늘어나요!",
  },
  {
    title: "열매를 동료에게 선물해요!",
    image: `${ASSET_PATH}/fruit-gift.png`,
    imageAlt: "두 구성원이 빨간 열매를 주고받는 모습",
    bullets: ["직원을 선택해요", "열매 개수와 전달내용을 입력해요", "리스트 추가 후 저장해요", "선물한 열매만큼 내 열매에서 차감돼요"],
    tip: "작은 응원이 동료에게 큰 힘이 돼요!",
  },
  {
    title: "씨앗을 나눠요 (씨앗나눔)",
    image: `${ASSET_PATH}/seed-sharing.png`,
    imageAlt: "새싹에 물을 주고 구성원에게 씨앗을 나누는 모습",
    bullets: ["프로젝트를 선택해요", "지급가능 씨앗을 확인해요", "직원별 씨앗을 배분해요", "지급가능 씨앗을 100% 배분해야 저장할 수 있어요"],
    tip: "프로젝트에 필요한 씨앗을 구성원들에게 나눠 함께 성장해요!",
  },
  {
    title: "내역과 보상을 확인해요",
    image: `${ASSET_PATH}/history.png`,
    imageAlt: "구성원이 포레스트 내역 화면을 살펴보는 모습",
    panels: [
      { title: "내역조회", text: "씨앗·열매의 획득/사용 내역, 주고받은 사람과 잔여 개수를 확인할 수 있어요." },
      { title: "업무일지 승인", text: "승인자는 미승인 업무일지를 확인하고 승인할 수 있어요. 승인 시 승인 열매가 지급돼요." },
    ],
  },
];
