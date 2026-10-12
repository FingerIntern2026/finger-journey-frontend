const ASSET_PATH = "/assets/pth/rules";

export const EMPLOYMENT_RULES = [
  {
    title: "수습기간",
    intro: "입사 후 3개월은 수습기간으로,\n새로운 업무와 핑거에 적응하는 시간이에요.",
    image: `${ASSET_PATH}/probation.png`,
    imageAlt: "핑거에 입사해 수습기간을 시작하는 구성원",
    details: [
      { icon: "calendar", title: "기간", lines: ["입사 후 3개월"] },
      { icon: "sprout", title: "목적", lines: ["업무 적응 및", "역량 향상"] },
      { icon: "check", title: "평가", lines: ["업무 수행 및", "적응도 평가"] },
    ],
  },
  {
    title: "근무시간",
    intro: "핑거는 서로의 시간을 존중하며,\n몰입해서 일할 수 있는 근무환경을 만들고 있어요!",
    image: `${ASSET_PATH}/work-hours.png`,
    imageAlt: "오전 9시부터 오후 6시까지 근무하는 구성원",
    details: [
      { icon: "clock", title: "기본 근무시간", lines: ["09:00 ~ 18:00", "(휴게시간 제외)"] },
      { icon: "calendar", title: "근무 기준", lines: ["1일 8시간", "주 40시간 근무"] },
      { icon: "coffee", title: "별도 운영", lines: ["필요 시 회사 방침에 따라", "별도 근무 시간 운영 가능"] },
    ],
  },
  {
    title: "휴일 및 휴가",
    intro: "연차부터 경조휴가까지,\n필요한 순간에 사용할 수 있는 다양한 휴가제도가 있어요.",
    image: `${ASSET_PATH}/vacation.png`,
    imageAlt: "휴가를 보내는 구성원과 달력",
    details: [
      { icon: "umbrella", title: "연차휴가", lines: ["1년간 80% 이상 출근 시", "연차휴가 15일 부여", "1년 미만은 1개월마다 1일 발생"] },
      { icon: "flower", title: "경조휴가", lines: ["결혼·회갑·출산·사망 등", "경조사에 따라", "정해진 휴가 사용 가능"] },
      { icon: "luggage", title: "기타휴가", lines: ["병가, 공가, 산전후휴가,", "배우자 출산휴가 등", "다양한 휴가제도 운영"] },
    ],
  },
  {
    title: "휴직과 복직",
    intro: "필요한 경우 정해진 사유와 절차에 따라\n휴직을 신청할 수 있어요.",
    image: `${ASSET_PATH}/leave-return.png`,
    imageAlt: "휴직 중 편안하게 쉬는 구성원",
    details: [
      { icon: "file", title: "휴직 사유", lines: ["일신상의 불가피한 사정", "업무상 상병으로", "소정업무 수행이 불가능한 경우"] },
      { icon: "user-check", title: "복직승인", lines: ["휴직 사유가 소멸하면", "만료 15일 이내 복직원 제출", "회사의 복직 승인 필요"] },
      { icon: "user-x", title: "복직 불가", lines: ["복직원을 제출하지 않거나", "휴직기간 만료 시까지", "사유가 소멸되지 않은 경우"] },
    ],
  },
  {
    title: "상벌",
    intro: "업무에서 일정 기준을 벗어나 개인적인 사유로\n근무를 중단할 수 있도록 회사가 허용하는 제도예요.",
    image: `${ASSET_PATH}/reward-discipline.png`,
    imageAlt: "포상과 징계 기준을 상징하는 두 구성원",
    details: [
      { icon: "star", title: "포상", lines: ["사무 및 작업을 개선하여 실적이 현저한 경우", "업무능력이 우수하거나 성실하다고 인정될 때", "재해 예방 등에 우수한 공로가 있을 때"] },
      { icon: "alert", title: "징계", lines: ["훈계: 구두로 주의 조치", "감봉: 인사위원회 회부 후 감봉", "해고: 인사위원회 결의에 따른 조치"] },
    ],
  },
  {
    title: "퇴직과 해고",
    intro: "퇴사 시에는 사전에 의사를 전달하고\n필요한 인수인계와 절차를 진행해요.",
    image: `${ASSET_PATH}/retirement.png`,
    imageAlt: "업무 인수인계를 마치고 퇴사하는 구성원",
    details: [
      { icon: "mail", title: "퇴직 절차", lines: ["사직 희망일 1개월", "전까지 사직원 제출"] },
      { icon: "users", title: "해고 예고", lines: ["부득이 직원을 해임할 때", "30일 전에 예고"] },
      { icon: "package", title: "인수인계", lines: ["담당 업무 관련", "인계서류 작성 후 인계"] },
    ],
  },
];
