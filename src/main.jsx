// 역할: 앱을 실제 DOM에 마운트하는 진입점. BrowserRouter로 App 전체를 감싸 라우팅을 활성화함
// 사용처: 앱 진입점 (index.html이 로드)
// 담당자:

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
