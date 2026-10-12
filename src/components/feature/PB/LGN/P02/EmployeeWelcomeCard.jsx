// 역할: 입사 축하 카드와 컨페티 애니메이션을 표시한다.
// 사용처: PB_LGN_P02
// 담당자: 김재웅

import { BadgeCheck } from "lucide-react";
import styles from "./EmployeeWelcomeCard.module.css";

const CONFETTI = [
  { x: "-192px", y: "-138px", rotate: "-58deg", color: "#ff9f43", delay: "0s" },
  { x: "-178px", y: "-70px", rotate: "54deg", color: "#fb6370", delay: "0.08s" },
  { x: "-188px", y: "18px", rotate: "-74deg", color: "#ffb132", delay: "0.14s" },
  { x: "-164px", y: "108px", rotate: "32deg", color: "#6478f5", delay: "0.03s" },
  { x: "-106px", y: "-150px", rotate: "82deg", color: "#56c77a", delay: "0.16s", round: true },
  { x: "-42px", y: "-158px", rotate: "-28deg", color: "#f550a6", delay: "0.1s" },
  { x: "38px", y: "-152px", rotate: "66deg", color: "#50a8fc", delay: "0.2s" },
  { x: "108px", y: "-142px", rotate: "-38deg", color: "#8d6df2", delay: "0.06s", round: true },
  { x: "174px", y: "-108px", rotate: "44deg", color: "#ff6f61", delay: "0.18s" },
  { x: "194px", y: "-40px", rotate: "-56deg", color: "#00b8a9", delay: "0.12s" },
  { x: "184px", y: "38px", rotate: "74deg", color: "#f4c542", delay: "0.05s" },
  { x: "168px", y: "116px", rotate: "-24deg", color: "#e94db8", delay: "0.22s" },
  { x: "104px", y: "152px", rotate: "58deg", color: "#7c65e8", delay: "0.11s", round: true },
  { x: "34px", y: "160px", rotate: "-68deg", color: "#ff874c", delay: "0.17s" },
  { x: "-48px", y: "152px", rotate: "36deg", color: "#42b77c", delay: "0.02s" },
  { x: "-118px", y: "142px", rotate: "-48deg", color: "#348df0", delay: "0.2s", round: true },
  { x: "-146px", y: "72px", rotate: "68deg", color: "#ff5d73", delay: "0.07s" },
  { x: "-82px", y: "-108px", rotate: "-32deg", color: "#ffb132", delay: "0.15s", round: true },
  { x: "84px", y: "-102px", rotate: "52deg", color: "#32a9f5", delay: "0.09s" },
  { x: "142px", y: "82px", rotate: "-72deg", color: "#a76cf5", delay: "0.19s" },
];

export default function EmployeeWelcomeCard({ name, department, className = "" }) {
  return (
    <section className={`${styles.celebration} ${className}`} aria-label={`${name}님의 사원증`}>
      {CONFETTI.map((piece, index) => (
        <span
          key={`${piece.x}-${piece.y}`}
          className={`${styles.confetti} ${piece.round ? styles.confettiRound : ""}`}
          style={{
            "--x": piece.x,
            "--y": piece.y,
            "--rotate": piece.rotate,
            "--color": piece.color,
            "--delay": piece.delay,
          }}
        />
      ))}
      <article className={styles.card}>
        <span className={styles.cardLogo}><BadgeCheck size={30} aria-hidden="true" /></span>
        <strong>{name}</strong>
        <span>{department}</span>
      </article>
    </section>
  );
}
