// 역할: 앱을 실제 DOM에 마운트하는 진입점.
// 사용처: 앱 진입점 (index.html이 로드)
// 담당자:

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
