// 역할: 위키 하위 항목의 제목·본문·이미지를 등록·수정하는 바텀시트 폼.
//       - 이미지는 최대 3장이고, 새로 고른 파일은 저장할 때 서버에 올린다. (취소하면 올리지 않음)
//       - 수정할 때 이미지를 건드리지 않으면 imagesChanged가 false라서 서버의 기존 이미지가 그대로 유지된다.
//       저장은 서버가 처리하고, 실패하면 서버가 준 오류 문구를 폼 안에 보여준다.
// 사용처: ADM_WIK_P01
// 담당자: 김재웅

import { useRef, useState } from "react";
import BaseButton from "../../../../common/base/BaseButton";
import BaseInput from "../../../../common/base/BaseInput";
import BaseTextArea from "../../../../common/base/BaseTextArea";
import CustomImageUploader from "../../../../common/custom/CustomImageUploader";
import styles from "./WikiForms.module.css";

const MAX_IMAGES = 3;
const WIKI_ICON_OPTIONS = [
  "📖", "🏠", "🎁", "🗺️", "🍜", "🌲", "🗓️", "🖨️",
  "📦", "📶", "🌴", "🍴", "📍", "🥢", "🔗", "💡",
];

export default function WikiItemForm({ item, onCancel, onSubmit }) {
  const fileInputRef = useRef(null);
  const [icon, setIcon] = useState(item?.icon ?? "📖");
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [title, setTitle] = useState(item?.title ?? "");
  const [content, setContent] = useState(item?.content ?? "");
  const [images, setImages] = useState(item?.images ?? []);
  const [imagesChanged, setImagesChanged] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const readImage = (event) => {
    const [file] = event.target.files ?? [];
    event.target.value = "";
    if (!file) return;
    if (images.length >= MAX_IMAGES) { setError(`이미지는 최대 ${MAX_IMAGES}장까지 올릴 수 있어요.`); return; }

    // 화면에 미리 보여주기만 하고, 서버 업로드는 저장할 때 한다.
    const reader = new FileReader();
    reader.onload = () => {
      setImages((previous) => [...previous, { id: `new-${Date.now()}`, url: reader.result, file }]);
      setImagesChanged(true);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (imageId) => {
    setImages((previous) => previous.filter((image) => image.id !== imageId));
    setImagesChanged(true);
    setError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) { setError("제목과 내용을 입력해주세요."); return; }

    setSaving(true);
    const message = await onSubmit({
      icon: icon.trim() || "📖",
      title: title.trim(),
      content: content.trim(),
      images,
      imagesChanged,
    });
    // 성공하면 폼이 닫히므로, 실패했을 때만 문구를 보여주고 다시 누를 수 있게 한다.
    if (message) { setError(message); setSaving(false); }
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <h2>{item ? "항목 수정" : "항목 추가"}</h2>
      <div className={styles.iconField}>
        <span className={styles.fieldLabel}>아이콘</span>
        <button
          type="button"
          className={styles.iconPickerTrigger}
          aria-label="아이콘 선택"
          aria-expanded={isIconPickerOpen}
          onClick={() => setIsIconPickerOpen((open) => !open)}
        >
          <span>{icon}</span>
          <span className={styles.iconPickerHint}>아이콘 선택</span>
        </button>
        {isIconPickerOpen && (
          <div className={styles.iconPicker} role="group" aria-label="아이콘 목록">
            {WIKI_ICON_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.iconOption} ${icon === option ? styles.selectedIcon : ""}`}
                aria-label={`${option} 아이콘`}
                aria-pressed={icon === option}
                onClick={() => {
                  setIcon(option);
                  setIsIconPickerOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <BaseInput label="제목" placeholder="김핑거" value={title} onChange={(event) => setTitle(event.target.value)} className={styles.input} />
      <BaseTextArea label="내용" placeholder="상세 내용을 입력해주세요" rows={3} value={content} onChange={(event) => setContent(event.target.value)} className={styles.textarea} />
      <div className={styles.imageField}>
        <span>이미지 ({images.length}/{MAX_IMAGES})</span>
        <CustomImageUploader images={images} onAddImage={() => fileInputRef.current?.click()} onRemoveImage={removeImage} />
        <input ref={fileInputRef} className={styles.fileInput} type="file" accept="image/png,image/jpeg,image/gif,image/webp" onChange={readImage} />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <BaseButton label="취소" variant="ghost" className={styles.cancel} onClick={onCancel} type="button" />
        <BaseButton label="저장" className={styles.submit} type="submit" disabled={saving} />
      </div>
    </form>
  );
}
