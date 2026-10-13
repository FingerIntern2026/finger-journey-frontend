import styles from "./Completion.module.css";

export default function CompletionIntro() {
  return (
    <section className={styles.intro}>
      <img className={styles.logo} src="/assets/pth/completion/finger-logo.png" alt="Finger" />
      <h1>3행시로 완주를<br />기념해볼까요?</h1>
      <p>본인 이름으로 3행시를 지어주세요!</p>
      <img className={styles.leaf} src="/assets/pth/completion/leaf.png" alt="" />
    </section>
  );
}
