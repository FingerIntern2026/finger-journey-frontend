import styles from './CheckinWebview.module.css';

export default function CheckinWebview({ src, title }) {
  const mixedContent = window.location.protocol === 'https:' && src.startsWith('http:');

  return (
    <div className={styles.container}>
      {!mixedContent && <iframe className={styles.frame} src={src} title={title} />}
      <p className={styles.help}>
        {mixedContent ? '아래 링크에서 로그인해주세요.' : '화면이 표시되지 않으면 새 창에서 로그인해주세요.'}
      </p>
      <a className={styles.link} href={src} target="_blank" rel="noopener noreferrer">{title} 새 창에서 열기 ↗</a>
    </div>
  );
}
