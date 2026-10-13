import BaseButton from '../../../common/base/BaseButton';
import approvalGuide from '../../../../assets/checkin/approval-guide.png';
import CheckinArtwork from '../common/CheckinArtwork';
import CheckinHeader from '../common/CheckinHeader';
import styles from './Approval.module.css';

export default function ApprovalGuide({ onBack, onNext }) {
  return (
    <main className={styles.page}>
      <CheckinHeader progress={75} onBack={onBack} className={styles.guideHeader} />
      <section className={`${styles.content} ${styles.steps}`}>
        <article className={styles.step}>
          <span className={styles.stepNumber}>1</span>
          <h2>ERP 로그인 후<br />왼편의 전자결재 클릭!</h2>
          <CheckinArtwork className={styles.screenshot} src={approvalGuide} title="전자결재 메뉴 선택 화면" viewBox="28 0 305 261" width={378} height={1549} />
        </article>
        <article className={styles.step}>
          <span className={styles.stepNumber}>2</span>
          <h2>결재 작성 클릭!</h2>
          <CheckinArtwork className={`${styles.screenshot} ${styles.menuScreenshot}`} src={approvalGuide} title="품의작성 메뉴 선택 화면" viewBox="136 385 115 214" width={378} height={1549} />
        </article>
        <article className={styles.step}>
          <span className={styles.stepNumber}>3</span>
          <h2>검색창에 신규 검색후<br />5가지 서류 작성!</h2>
          <CheckinArtwork className={styles.screenshot} src={approvalGuide} title="결재 양식 선택 화면" viewBox="0 732 378 259" width={378} height={1549} />
          <ol className={styles.documentNames}>
            <li>신규입사_개인정보보호 서약서</li>
            <li>신규입사_서약서 및 동의서</li>
            <li>신규입사_수습사원 서약서</li>
            <li>신규입사_연장근로 합의서</li>
            <li>신규입사_근로계약서</li>
          </ol>
        </article>
        <article className={styles.step}>
          <span className={styles.stepNumber}>4</span>
          <h2>계약서 작성 후 상신!</h2>
          <CheckinArtwork className={styles.screenshot} src={approvalGuide} title="결재 문서 작성 화면" viewBox="19 1298 350 251" width={378} height={1549} />
          <p className={styles.contractNote}>서류 제목 : (각 서류 이름)_(이름+본인의 직급)으로 작성<br />ex) 개인정보보호 서약서_김핑거 마스터<br /><br />스크롤을 내려 임원 비밀번호도 작성 후<br />위의 상신버튼 누르기</p>
        </article>
      </section>
      <BaseButton className={styles.nextButton} onClick={onNext}>작성을 완료했어요</BaseButton>
    </main>
  );
}
