import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.scss'
import App from './App.tsx'
import LaMejorNovia from './pages/LaMejorNovia.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/la-mejor-novia" element={<LaMejorNovia />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
