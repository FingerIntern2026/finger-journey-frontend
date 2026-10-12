// 역할: 위키 카테고리의 아이콘과 이름을 등록·수정하는 바텀시트 폼.
// 사용처: ADM_WIK_P01
// 담당자: 김재웅

import { useState } from "react";
import BaseButton from "../../../../common/base/BaseButton";
import BaseInput from "../../../../common/base/BaseInput";
import styles from "./WikiForms.module.css";

export default function WikiCategoryForm({ onCancel, onSubmit }) {
  const [icon, setIcon] = useState("📖");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!name.trim()) { setError("위키명을 입력해주세요."); return; }
    onSubmit({ icon: icon.trim() || "📖", name: name.trim() });
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <h2>위키 등록</h2>
      <BaseInput label="아이콘" value={icon} onChange={(event) => setIcon(event.target.value)} className={styles.input} />
      <BaseInput label="위키명" placeholder="회사생활 꿀팁" value={name} onChange={(event) => setName(event.target.value)} error={error} className={styles.input} />
      <div className={styles.actions}>
        <BaseButton label="취소" variant="ghost" className={styles.cancel} onClick={onCancel} type="button" />
        <BaseButton label="저장" className={styles.submit} type="submit" />
      </div>
    </form>
  );
}
