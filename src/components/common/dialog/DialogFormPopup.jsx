// 역할: 신규 등록/정보 수정처럼 여러 입력 필드를 받는 공통 다이얼로그 폼.
// 화면은 field 정의와 저장 콜백만 전달하고, 입력값·필수값 검사는 이 컴포넌트가 관리한다.

import { useState } from "react";
import BaseButton from "../base/BaseButton";
import BaseInput from "../base/BaseInput";
import styles from "./dialog.module.css";

export default function DialogFormPopup({
  title,
  fields,
  initialValues = {},
  submitLabel = "저장",
  cancelLabel = "취소",
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (name, value) => {
    setValues((previousValues) => ({ ...previousValues, [name]: value }));
    setErrors((previousErrors) => ({ ...previousErrors, [name]: "" }));
    setSubmitError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = fields.reduce((result, field) => {
      if (field.required && !String(values[field.name] ?? "").trim()) {
        result[field.name] = `${field.label}을 입력해주세요.`;
      }
      return result;
    }, {});

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const result = await onSubmit?.(values);
    if (typeof result === "string") {
      setSubmitError(result);
    }
  };

  return (
    <form className={styles.formPopup} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>{title}</h2>

      <div className={styles.formFields}>
        {fields.map((field) => (
          <BaseInput
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type ?? "text"}
            value={values[field.name] ?? ""}
            placeholder={field.placeholder}
            error={errors[field.name]}
            onChange={(event) => handleChange(field.name, event.target.value)}
            className={styles.formInput}
          />
        ))}
      </div>

      {submitError && <p className={styles.formError}>{submitError}</p>}

      <div className={styles.formActions}>
        <BaseButton label={cancelLabel} variant="ghost" className={styles.formCancel} onClick={onCancel} type="button" />
        <BaseButton label={submitLabel} className={styles.formSubmit} type="submit" />
      </div>
    </form>
  );
}
