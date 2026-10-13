const ASSET_PATH = "/assets/pth/hr-policy";

export const HR_POLICIES = [
  {
    title: "평가제도",
    intro: "업무 성과와 역량을 바탕으로\n한 해의 성장을 함께 돌아봐요.",
    image: `${ASSET_PATH}/evaluation.png`,
    imageAlt: "달력 옆에서 평가표를 작성하는 구성원",
    details: [
      { icon: "calendar", title: "평가기간", lines: ["매년 1월 1일 ~", "12월 31일"] },
      { icon: "file", title: "평가 내용", lines: ["승진·승격 / 연봉", "전환배치 / 교육훈련", "등에 활용"] },
      { icon: "sprout", title: "평가", lines: ["고과 대상 및 실시 시기는", "별도 규정에 따라 운영"] },
    ],
  },
  {
    title: "승진제도",
    intro: "역량과 성과를 바탕으로\n새로운 단계에 도전할 수 있어요.",
    image: `${ASSET_PATH}/promotion.png`,
    imageAlt: "L1부터 L3까지 승진 단계를 오르는 구성원",
    details: [
      { icon: "badge", title: "레벨승진", lines: ["행동지표 및 성과결과를", "본인이 작성하여 승진 신청", "심의와 인사위원회로 최종 결정"] },
      { icon: "star", title: "특별승진", lines: ["직무수행능력이 탁월하여", "회사발전에 현저히 공헌하거나", "대표이사가 필요하다고 인정할 때"] },
      { icon: "calendar", title: "정기승진 일자", lines: ["매년 1월 1일자로 실시", "", "기타 승진 제한", "징계·무단결근·대기발령 등"] },
    ],
  },
  {
    title: "보수",
    intro: "정해진 기준에 따라\n급여와 보상이 지급돼요.",
    image: `${ASSET_PATH}/compensation.png`,
    imageAlt: "성과를 낸 구성원에게 별 모양 상을 전달하는 모습",
    details: [
      { icon: "wallet", title: "지급일", lines: ["매월 말일 지급"] },
      { icon: "calculator", title: "보수의 계산", lines: ["채용·복직·면직 등의 경우", "발령일을 기준으로", "일할 계산"] },
      { icon: "shield", title: "근로 및 연봉계약 기간", lines: ["매년 1월 1일부터", "12월 31일까지"] },
    ],
  },
];
