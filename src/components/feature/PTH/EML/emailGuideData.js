const ASSET_PATH = "/assets/pth/email";

export const EMAIL_GUIDE_STEPS = [
  {
    title: "Finger ERP 실행 및 메일 메뉴 선택",
    description: "Finger ERP에 접속한 뒤 왼쪽 메뉴에서 ‘메일’을 선택해 주세요.",
    image: `${ASSET_PATH}/mail-menu.png`,
    imageAlt: "Finger ERP 왼쪽 메뉴에서 메일을 선택하는 화면",
  },
  {
    title: "메일쓰기 선택",
    description: "메일 화면 상단의 ‘메일쓰기’ 버튼을 선택해 주세요.",
    image: `${ASSET_PATH}/compose-button.png`,
    imageAlt: "메일 화면에서 메일쓰기 버튼을 선택하는 화면",
  },
  {
    title: "주소록 열기",
    description: "받는사람 또는 참조 항목 오른쪽의 ‘주소록’을 선택해 주세요.",
    image: `${ASSET_PATH}/address-button.png`,
    imageAlt: "메일쓰기 화면에서 주소록 버튼을 선택하는 화면",
  },
  {
    title: "수신자 검색 및 선택",
    description: "주소록이나 조직도에서 받을 사람을 찾거나 검색해 선택해 주세요.",
    image: `${ASSET_PATH}/address-book.png`,
    imageAlt: "주소록에서 수신자를 검색하는 화면",
  },
  {
    title: "수신자 등록 후 메일 작성 및 발송",
    description: "수신자를 선택해 받는사람·참조에 등록하고, 제목과 내용을 작성한 뒤 ‘보내기’를 선택해 주세요.",
    image: `${ASSET_PATH}/recipient-selection.png`,
    imageAlt: "주소록에서 받는사람과 참조를 등록하는 화면",
  },
];
