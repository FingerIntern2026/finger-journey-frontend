import AcrosticInputForm from "../../../common/custom/AcrosticInputForm";
import Header from "../common/Header";
import PageLayout from "../common/PageLayout";
import CompletionIntro from "./CompletionIntro";
import styles from "./Completion.module.css";

export default function CompletionInput({ name, employeeId, onBack, onSuccess, preview = false }) {
  return (
    <PageLayout className={styles.page} header={<Header label="온보딩 진행 중" current={8} total={9} onBack={onBack} />}>
      <div className={styles.pageBody}>
        <CompletionIntro />
        <AcrosticInputForm
          name={name}
          apiUrl="/complete/poem"
          extraBody={employeeId ? { employeeId: Number(employeeId) } : {}}
          submitter={preview ? async () => undefined : undefined}
          skipValidation={preview}
          onSuccess={onSuccess}
          className={styles.form}
        />
      </div>
    </PageLayout>
  );
}
