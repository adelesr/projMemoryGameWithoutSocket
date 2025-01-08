import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router'
import ChatPage from './Page/ChatPage/ChatPage.jsx';
import MemoryGamePage from './Page/MemoryGamePage/MemoryGame.jsx'



axios.defaults.baseURL = "http://localhost:8080";
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
    <Routes>
      <Route path='/' element={<ChatPage/>}/>
      <Route path='/memory-game' element={<MemoryGamePage/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
