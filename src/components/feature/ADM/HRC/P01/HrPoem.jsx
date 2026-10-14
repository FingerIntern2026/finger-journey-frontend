// 역할: 선택한 입사자가 완주 화면에서 작성한 이름 3행시를 조회해 보여준다.
// 사용처: ADM_HRC_P01
// 담당자: 김재웅

import { useEffect, useState } from "react";
import { sendPost } from "../../../../../api/client";
import styles from "./HrPoem.module.css";

export default function HrPoem({ employee }) {
  const [status, setStatus] = useState("loading");
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let active = true;

    const loadPoem = async () => {
      setStatus("loading");
      setLines([]);

      try {
        const response = await sendPost("/complete/poem/my", { employeeId: employee.id });
        if (!active) return;

        setLines(response?.data?.lines ?? []);
        setStatus("ready");
      } catch {
        if (active) setStatus("empty");
      }
    };

    loadPoem();
    return () => {
      active = false;
    };
  }, [employee.id]);

  return (
    <section className={styles.section} aria-labelledby="employee-poem-title">
      <div className={styles.heading}>
        <h2 id="employee-poem-title">{employee.name}님의 완주 3행시</h2>
        <span>온보딩 완료</span>
      </div>

      {status === "loading" && <p className={styles.message}>3행시를 불러오는 중이에요.</p>}
      {status === "empty" && <p className={styles.message}>작성된 3행시가 없습니다.</p>}
      {status === "ready" && (
        <div className={styles.lines}>
          {lines.map((line, index) => (
            <p key={`${line.letter}-${index}`}>
              <b>{line.letter}</b>
              <span>{line.text}</span>
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
