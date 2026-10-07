// 역할: DB 화면정보의 filePath를 Vite 동적 import 대상과 연결하고 화면 컴포넌트를 지연 로딩한다.
// 사용처: AppRoutes.jsx, screenService.js
// 담당자: 홍지연

import { lazy } from 'react';

// Vite가 빌드 시점에 화면 후보를 모두 파악하고 화면별 청크로 분리할 수 있도록 한다.
const pageModules = import.meta.glob('../pages/**/*.jsx');
const componentCache = new Map();

function normalizeFilePath(filePath) {
  return filePath
    .trim()
    .replaceAll('\\\\', '/')
    .replace(/^\.\//, '')
    .replace(/^src\/pages\//, '')
    .replace(/^pages\//, '')
    .replace(/^\/+/, '');
}

export function getScreenModulePath(filePath) {
  if (typeof filePath !== 'string' || !filePath.trim()) {
    throw new Error('화면정보에 filePath가 필요합니다.');
  }

  const normalizedPath = normalizeFilePath(filePath);

  if (normalizedPath.includes('..')) {
    throw new Error(`상위 폴더를 참조하는 filePath는 사용할 수 없습니다: ${filePath}`);
  }

  return `../pages/${normalizedPath}`;
}

export function hasScreenModule(filePath) {
  return Boolean(pageModules[getScreenModulePath(filePath)]);
}

export function loadScreenComponent(filePath) {
  const modulePath = getScreenModulePath(filePath);
  const loader = pageModules[modulePath];

  if (!loader) {
    throw new Error(`filePath에 해당하는 화면 파일이 없습니다: ${filePath}`);
  }

  if (!componentCache.has(modulePath)) {
    componentCache.set(modulePath, lazy(loader));
  }

  return componentCache.get(modulePath);
}
