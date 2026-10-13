// 역할: 입사 축하 카드와 첫 출근 안내를 제공하는 프리보딩 완료 화면.
// 사용처: 화면 코드 PB_LGN_P02
// 담당자: 김재웅

import { useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import BaseButton from "../../components/common/base/BaseButton";
import CustomAccordion from "../../components/common/custom/CustomAccordion";
import CustomInfoCard from "../../components/common/custom/CustomInfoCard";
import FirstDayTimeline from "../../components/feature/PB/LGN/P02/FirstDayTimeline";
import EmployeeWelcomeCard from "../../components/feature/PB/LGN/P02/EmployeeWelcomeCard";
import PreboardingHero from "../../components/feature/PB/LGN/P01/PreboardingHero";
import useNavigationStore from "../../stores/useNavigationStore";
import styles from "./PB_LGN_P02.module.css";

const EMPLOYEE = {
  name: "김핑거",
  department: "Common Tech Part",
};

const GUIDES = [
  { icon: "🗓️", title: "첫 출근 일정", description: "오전 9시까지 로비 안내데스크로 와주세요. 이후 일정은 HR담당자가 순서대로 안내해드려요." },
  { icon: "👔", title: "출근 복장", description: "비즈니스 캐주얼이 기본이에요. 첫날은 단정한 캐주얼 차림이면 충분해요." },
  { icon: "📍", title: "회사 위치 및 교통정보", description: "2호선 강남역 3번 출구에서 도보 5분, 판교역에서도 셔틀버스가 있어요." },
  { icon: "🚗", title: "주차", description: "지하 2층 방문자 주차장을 이용해주세요. 사전 등록하면 3시간 무료예요." },
  { icon: "🔑", title: "출입 절차 및 대기장소", description: "1층 로비에서 방문증을 발급받은 뒤 경영지원팀 담당자와 함께 출입카드를 수령해요." },
  { icon: "🎒", title: "준비물", description: "신분증, 통장사본, 각종 자격증 사본을 챙겨와주세요." },
  { icon: "📄", title: "건강검진 및 제출서류", description: "입사기록부와 건강검진결과서를 입사 3일 전까지 이메일로 제출해주세요." },
];

const TIMELINE = [
  { time: "09:00", title: "도착 및 체크인", icon: "📍" },
  { time: "09:30", title: "신규 직원교육", icon: "📖" },
  { time: "12:00", title: "점심 식사", icon: "🍽️" },
  { time: "13:00", title: "오후 교육", icon: "💻" },
  { time: "15:00", title: "팀 소개", icon: "👋" },
  { time: "18:00", title: "퇴근", icon: "🏠" },
];

const FAQS = [
  { id: "parking", title: "주차는 어디에 하나요?", content: "지하 2층 방문자 주차장을 이용해주세요. 사전 등록하면 3시간 무료예요." },
  { id: "checkin", title: "출퇴근은 어디에 하나요?", content: "첫 출근일에 지급되는 출입카드로 출퇴근을 체크할 수 있어요." },
  { id: "lunch", title: "점심 식사는 어떻게 하나요?", content: "첫날 점심은 팀원과 함께하며, 이후에는 사내 식당 또는 주변 식당을 이용할 수 있어요." },
  { id: "dress", title: "복장은 어떻게 하나요?", content: "비즈니스 캐주얼을 기본으로 하며, 방문 일정이 있는 날은 별도 안내를 확인해주세요." },
];

export default function PB_LGN_P02() {
  const goForward = useNavigationStore((state) => state.goForward);
  const introRef = useRef(null);
  const detailsRef = useRef(null);
  const timelineRef = useRef(null);

  const scrollTo = (target) => target.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className={styles.page}>
      <section className={styles.introSection} ref={introRef}>
        <div className={styles.introContent}>
          <PreboardingHero
            name={EMPLOYEE.name}
            description={<>출근 전 꼭 확인해야 할 정보를 한 번에 모아봤어요.<br />쭉 내려가며 확인해보세요.</>}
          />
          <EmployeeWelcomeCard name={EMPLOYEE.name} department={EMPLOYEE.department} className={styles.welcomeCard} />
        </div>
        <button type="button" className={styles.scrollCue} onClick={() => scrollTo(detailsRef)} aria-label="안내 정보로 이동">
          <i className={styles.scrollCueIcon}><ChevronDown size={22} aria-hidden="true" /></i>
        </button>
      </section>

      <div className={styles.detailsContent} ref={detailsRef}>
        <section className={styles.guideSection} aria-label="출근 전 안내 정보">
          {GUIDES.map((guide) => <CustomInfoCard key={guide.title} {...guide} className={styles.guideCard} />)}
        </section>

        <button
          type="button"
          className={styles.sectionDivider}
          onClick={() => scrollTo(timelineRef)}
          aria-label="첫날 일정으로 이동"
        >
          <ChevronDown size={22} aria-hidden="true" />
        </button>

        <section className={styles.timelineSection} ref={timelineRef}>
          <h2>첫날은 이렇게 흘러가요</h2>
          <FirstDayTimeline items={TIMELINE} />
        </section>

        <section className={styles.faqSection}>
          <h2>FAQ</h2>
          <CustomAccordion items={FAQS} className={styles.faqList} />
        </section>

        <BaseButton
          label="체크인 시작하기"
          fullWidth
          className={styles.checkInButton}
          onClick={() => goForward("CHK_INT_P01")}
        />
        <button type="button" className={`${styles.scrollCue} ${styles.scrollCueUp}`} onClick={() => scrollTo(introRef)} aria-label="처음으로 이동">
          <i className={styles.scrollCueIcon}><ChevronUp size={22} aria-hidden="true" /></i>
        </button>
      </div>
    </main>
  );
}
