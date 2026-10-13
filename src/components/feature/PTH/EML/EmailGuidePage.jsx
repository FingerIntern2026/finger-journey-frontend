import { useEffect, useRef, useState } from "react";
import BaseButton from "../../../common/base/BaseButton";
import Header from "../../../common/layout/Header";
import PageLayout from "../../../common/layout/PageLayout";
import EmailGuideStep from "./EmailGuideStep";
import EmailIntro from "./EmailIntro";
import { EMAIL_GUIDE_STEPS } from "./emailGuideData";
import styles from "./EmailGuide.module.css";

export default function EmailGuidePage({ onBack, onNext }) {
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasReachedEnd(true);
      },
      { threshold: 0.8 },
    );

    const target = endRef.current;
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <PageLayout
      className={styles.page}
      header={<Header label="온보딩 진행 중" current={4} total={9} onBack={onBack} />}
    >
      <div className={styles.pageBody}>
        <EmailIntro />
        <section className={styles.guideList} aria-label="이메일 작성 순서">
          {EMAIL_GUIDE_STEPS.map((step, index) => (
            <EmailGuideStep key={step.title} index={index} step={step} />
          ))}
        </section>
        <div ref={endRef} className={styles.endMarker} aria-hidden="true" />
        <div className={styles.actionArea}>
          <BaseButton
            label="다음"
            onClick={onNext}
            disabled={!hasReachedEnd}
            fullWidth
            className={styles.nextButton}
          />
        </div>
      </div>
    </PageLayout>
  );
}
