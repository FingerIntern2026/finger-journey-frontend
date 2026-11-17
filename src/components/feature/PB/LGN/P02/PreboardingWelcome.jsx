import { logout } from '../../../../../services/authService';
import useNavigation from '../../../../../hooks/useNavigation';
import { useState } from 'react';
import useAuthStore from '../../../../../stores/authStore';
import { useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import BaseButton from "../../../../common/base/BaseButton";
import CustomAccordion from "../../../../common/custom/CustomAccordion";
import CustomInfoCard from "../../../../common/custom/CustomInfoCard";
import PreboardingHero from "../P01/PreboardingHero";
import EmployeeWelcomeCard from "./EmployeeWelcomeCard";
import FirstDayTimeline from "./FirstDayTimeline";
import { FAQS, GUIDES, TIMELINE } from "./preboardingData";
import styles from "./PreboardingWelcome.module.css";

export default function PreboardingWelcome({ onStartCheckin }) {
  const { goForward } = useNavigation();
  const [logoutError, setLogoutError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
      goForward('PB_LGN_P01', {}, { clearHistory: true });
    } catch {
      setLogoutError('서버에 로그아웃을 요청하지 못했습니다. 다시 로그인해주세요.');
    } finally { setLoggingOut(false); }
  };
  const employee = useAuthStore((state) => state.session);
  const introRef = useRef(null);
  const detailsRef = useRef(null);
  const timelineRef = useRef(null);

  const scrollTo = (target) => target.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className={styles.page}>
      <section className={styles.introSection} ref={introRef}>
        {/* 로그아웃은 첫 화면 오른쪽 위에 작게 둔다. (예전에는 FAQ 아래에 붙어 있었음) */}
        <BaseButton
          label={loggingOut ? '로그아웃 중...' : '로그아웃'}
          variant="ghost"
          disabled={loggingOut}
          onClick={handleLogout}
          className={styles.logoutButton}
        />
        {logoutError && <p role="alert" className={styles.logoutError}>{logoutError}</p>}
        <div className={styles.introContent}>
          <PreboardingHero
            name={employee?.name ?? ''}
            description={<>출근 전 꼭 확인해야 할 정보를 한 번에 모아봤어요.<br />쭉 내려가며 확인해보세요.</>}
          />
          <EmployeeWelcomeCard name={employee?.name ?? ''} department={employee?.organizationName ?? ''} className={styles.welcomeCard} />
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
