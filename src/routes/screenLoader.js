// 역할: DB 화면정보의 filePath로 화면 컴포넌트를 지연 로딩한다.
// 사용처: ScreenRenderer.jsx
// 담당자: 홍지연

import { lazy } from 'react';

const componentCache = new Map();

// Vite는 동적 import의 변수 하나로 한 단계 폴더만 처리하므로 폴더 깊이별로 나눈다.
function importScreen(filePath) {
  const parts = filePath.replace(/\.jsx$/, '').split('/');

  if (parts.length === 2) {
    const [folder, file] = parts;
    return import(`../pages/${folder}/${file}.jsx`);
  }

  if (parts.length === 3) {
    const [folder, subFolder, file] = parts;
    return import(`../pages/${folder}/${subFolder}/${file}.jsx`);
  }

  throw new Error(`지원하지 않는 filePath 형식입니다: ${filePath}`);
}

export function loadScreenComponent(filePath) {
  if (!componentCache.has(filePath)) {
    componentCache.set(filePath, lazy(() => importScreen(filePath)));
  }

  return componentCache.get(filePath);
}
