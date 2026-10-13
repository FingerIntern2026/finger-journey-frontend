import BaseButton from "../../../common/base/BaseButton";
import Header from "../../../common/layout/Header";
import PageLayout from "../../../common/layout/PageLayout";
import styles from "./CompletionReport.module.css";

function splitParagraphs(text) {
  return (text ?? "").split(/\n\n+/).filter(Boolean);
}

export default function CompletionReport({ report, poemLines, onBack, onWikiClick }) {
  return (
    <PageLayout header={<Header label="온보딩 진행 중" current={9} total={9} onBack={onBack} />}>
      <main className={styles.page}>
        <article className={styles.report}>
          <div className={styles.progressHead}>
            <div className={styles.bar}><div className={styles.barFill} /></div>
            <span>9/9</span>
            <span aria-hidden="true">🌱</span>
          </div>

          <header className={styles.hero}>
            <span className={styles.eyebrow}>✦ AI가 정리한 나의 첫 페이지</span>
            <h1>{report.employeeName}님의 첫걸음</h1>
            <p>오늘의 첫 페이지 · 취향 9개로 완성</p>
          </header>

          <section className={styles.section}>
            {report.headline && <h2>{report.headline}</h2>}
            <div className={styles.story}>
              {splitParagraphs(report.reportContent).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {report.quote && (
              <div className={styles.quote}>
                <strong>"{report.quote}"</strong>
                {report.quoteDescription && <p>{report.quoteDescription}</p>}
              </div>
            )}
            {report.keywords?.length > 0 && (
              <ul className={styles.keywords}>
                {report.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
              </ul>
            )}
          </section>

          {poemLines.length > 0 && (
            <section className={styles.poemSection}>
              <h2>✦ 완주 기념 3행시</h2>
              <div className={styles.poem}>
                <p>{report.employeeName} #오솔길완주 #3행시</p>
                {poemLines.map((line) => (
                  <div key={line.letter} className={styles.poemRow}>
                    <b>{line.letter}</b>
                    <span>{line.text}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className={styles.footer}>
            <BaseButton label="핑거 위키 보러가기" onClick={onWikiClick} fullWidth />
          </div>
        </article>
      </main>
    </PageLayout>
  );
}
