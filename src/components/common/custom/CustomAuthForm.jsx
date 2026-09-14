// CustomAuthForm.jsx
// 사원번호+생년월일(프리보딩), 관리자ID+PW(관리자), 암호 1개(체크인)
// 이렇게 필드 개수가 다른 3개 화면을 전부 커버하는 공용 인증 폼이에요.
// input 태그는 직접 안 만들고, 팀이 이미 만든 BaseInput 부품을 갖다 써요.

import { useState } from 'react';
import BaseInput from '../base/BaseInput';
import styles from './custom.module.css';

const CustomAuthForm = ({
  field1Label,        // 필드1 placeholder (예: "사원번호를 입력하세요")
  field2Label,        // 필드2 placeholder. 이 값이 없으면 필드2 자체를 안 그림
  field1Length,       // 필드1 최대 자릿수 (예: 사원번호=8)
  field2Length,       // 필드2 최대 자릿수 (예: 생년월일=6)
  field2IsPassword,   // true면 필드2를 비밀번호처럼 가려서 보여줌 (관리자 PW용)
  buttonLabel,        // 버튼 글자
  onSubmit,           // 버튼 눌렀을 때 실행할 함수
  serverError,        // 부모(페이지)가 API 결과로 넘겨주는 에러 문구
}) => {
  const [field1Value, setField1Value] = useState('');
  const [field2Value, setField2Value] = useState('');
  const [emptyError, setEmptyError] = useState('');

  // field2Label을 안 넘기면(undefined) 필드1개짜리 화면(체크인 암호 입력)으로 판단
  const isSingleField = !field2Label;

  // 숫자만 남기고, 정해진 자릿수까지만 잘라주는 함수
  const filterNumbers = (rawValue, maxLength) => {
    const onlyNumbers = rawValue.replace(/[^0-9]/g, '');
    return maxLength ? onlyNumbers.slice(0, maxLength) : onlyNumbers;
  };

  const handleField1Change = (e) => {
    setField1Value(filterNumbers(e.target.value, field1Length));
  };

  const handleField2Change = (e) => {
    setField2Value(filterNumbers(e.target.value, field2Length));
  };

  const handleSubmit = () => {
    // 필드1개짜리 화면이면 field1Value만 체크, 필드2개짜리면 둘 다 체크
    const isEmpty = isSingleField
      ? field1Value === ''
      : field1Value === '' || field2Value === '';

    if (isEmpty) {
      setEmptyError('번호를 입력해주세요');
      return; // 여기서 끝내버려서 onSubmit(API 호출)은 실행 안 시킴
    }

    setEmptyError('');

    // 필드 개수에 따라 onSubmit한테 넘겨주는 값 개수도 다르게
    if (isSingleField) {
      onSubmit(field1Value);
    } else {
      onSubmit(field1Value, field2Value);
    }
  };

  // 빈 값 에러가 있으면 그걸 먼저 보여주고, 없으면 서버 에러를 보여줌
  const displayError = emptyError || serverError;

  return (
    <div className={styles.authForm}>
      {/* 필드1 - 사원번호 / 관리자ID / 체크인 암호, 항상 그려짐 */}
      <BaseInput
        placeholder={field1Label}
        value={field1Value}
        onChange={handleField1Change}
        inputMode="numeric"
      />

      {/* 필드2 - field2Label이 있을 때만 그려짐 (없으면 이 블록 통째로 생략) */}
      {!isSingleField && (
        <BaseInput
          type={field2IsPassword ? 'password' : 'text'}
          placeholder={field2Label}
          value={field2Value}
          onChange={handleField2Change}
          inputMode="numeric"
        />
      )}

      {/* 에러 문구 - 폼 전체 하단, 버튼 바로 위에 한 줄로 표시 */}
      {displayError && <p className={styles.formErrorText}>{displayError}</p>}

      {/* 버튼 - 빈 값이어도 항상 눌림 (비활성화 안 함) */}
      <button className={styles.submitButton} onClick={handleSubmit}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default CustomAuthForm;
