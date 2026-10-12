import { useRef, useState } from "react";
import BaseButton from "../../../../common/base/BaseButton";
import BaseInput from "../../../../common/base/BaseInput";
import BaseTextArea from "../../../../common/base/BaseTextArea";
import CustomImageUploader from "../../../../common/custom/CustomImageUploader";
import styles from "./WikiForms.module.css";

export default function WikiItemForm({ item, onCancel, onSubmit }) {
  const fileInputRef = useRef(null);
  const [icon, setIcon] = useState(item?.icon ?? "📖");
  const [title, setTitle] = useState(item?.title ?? "");
  const [content, setContent] = useState(item?.content ?? "");
  const [images, setImages] = useState(item?.images ?? []);
  const [error, setError] = useState("");

  const readImage = (event) => {
    const [file] = event.target.files ?? [];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImages((previous) => [...previous, { id: `image-${Date.now()}`, url: reader.result }]);
    reader.readAsDataURL(file);
    event.target.value = "";
  };
  const submit = (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) { setError("제목과 내용을 입력해주세요."); return; }
    onSubmit({ icon: icon.trim() || "📖", title: title.trim(), content: content.trim(), images });
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <h2>{item ? "항목 수정" : "항목 추가"}</h2>
      <BaseInput label="아이콘" value={icon} onChange={(event) => setIcon(event.target.value)} className={styles.input} />
      <BaseInput label="제목" placeholder="김핑거" value={title} onChange={(event) => setTitle(event.target.value)} className={styles.input} />
      <BaseTextArea label="내용" placeholder="상세 내용을 입력해주세요" rows={3} value={content} onChange={(event) => setContent(event.target.value)} className={styles.textarea} />
      <div className={styles.imageField}>
        <span>이미지</span>
        <CustomImageUploader images={images} onAddImage={() => fileInputRef.current?.click()} onRemoveImage={(imageId) => setImages((previous) => previous.filter((image) => image.id !== imageId))} />
        <input ref={fileInputRef} className={styles.fileInput} type="file" accept="image/*" onChange={readImage} />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <BaseButton label="취소" variant="ghost" className={styles.cancel} onClick={onCancel} type="button" />
        <BaseButton label="저장" className={styles.submit} type="submit" />
      </div>
    </form>
  );
}
