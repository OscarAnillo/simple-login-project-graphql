import { useState } from 'react'
import { NavBar } from './Components/Nav-bar'

import { Routes, Route} from 'react-router-dom'

import { HomeComponent } from './Pages/Home'
import { LoginPage } from './Pages/Login'
import { RegisterPage } from './Pages/Register'

import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState("");

  return (
    <>
     <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
     <Routes>
      <Route path="/" element={<HomeComponent /> } />
      <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} /> } />
      <Route path="/register" element={<RegisterPage /> } />
     </Routes>
    </>
  )
}

export default App
