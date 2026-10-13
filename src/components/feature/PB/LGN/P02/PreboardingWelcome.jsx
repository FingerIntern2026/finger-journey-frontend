import { useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import BaseButton from "../../../../common/base/BaseButton";
import CustomAccordion from "../../../../common/custom/CustomAccordion";
import CustomInfoCard from "../../../../common/custom/CustomInfoCard";
import PreboardingHero from "../P01/PreboardingHero";
import EmployeeWelcomeCard from "./EmployeeWelcomeCard";
import FirstDayTimeline from "./FirstDayTimeline";
import { EMPLOYEE, FAQS, GUIDES, TIMELINE } from "./preboardingData";
import styles from "./PreboardingWelcome.module.css";

export default function PreboardingWelcome({ onStartCheckin }) {
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

        <button type="button" className={styles.sectionDivider} onClick={() => scrollTo(timelineRef)} aria-label="첫날 일정으로 이동">
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

        <BaseButton label="체크인 시작하기" fullWidth className={styles.checkInButton} onClick={onStartCheckin} />
        <button type="button" className={`${styles.scrollCue} ${styles.scrollCueUp}`} onClick={() => scrollTo(introRef)} aria-label="처음으로 이동">
          <i className={styles.scrollCueIcon}><ChevronUp size={22} aria-hidden="true" /></i>
        </button>
      </div>
    </main>
  );
}
