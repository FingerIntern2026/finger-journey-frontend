import wikiIntroForest from "../../../../../assets/wiki-intro-forest.png";
import { House } from "lucide-react";
import styles from "./WikiIntroHero.module.css";

export default function WikiIntroHero() {
  return (
    <section className={styles.hero}>
      <h1>핑거의 이야기가<br />모여 있는 곳, 핑거 위키</h1>
      <p>지나는 여정부터<br />앞으로 걸을 길까지 한곳에서 만나보세요.<br />핑거 생활에 필요한 모든 정보를 한곳에 모아두었어요.</p>
      <img className={styles.illustration} src={wikiIntroForest} alt="핑거 위키 숲과 건물 일러스트" />
    </section>
  );
}
