// useNavigation.js의 역할
// 페이지 이동(다른 주소로 가기 / 값 넘기기 / 뒤로가기)을 한 곳에서 관리하는 커스텀 훅
// React Router의 useNavigate를 직접 페이지마다 쓰지 않고 이 훅을 통해서만 사용
// 나중에 이동 로직에 공통 기능(로그 남기기 등)을 추가해도 이 훅만 수정하면 됨

import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();

  // 특정 경로로 이동 (필요하면 값을 함께 넘김)
  const goTo = (path, state) => {
    navigate(path, { state });
  };

  // 이전 페이지로 돌아가기
  const goBack = () => {
    navigate(-1);
  };

  return { goTo, goBack };
}