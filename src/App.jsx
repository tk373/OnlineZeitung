import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AddArticle from './Pages/AddArticle';
import Welcome from './Pages/Welcome';
import About from './Pages/About';
import Abo from './Pages/Abo';
import Generate from './Pages/Generate';
import Register from './Pages/Register';
import Login from './Pages/Login';
import AuthGuard from './auth/AuthGuard';

function App() {
  

  return (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Add" element={<AuthGuard><AddArticle /></AuthGuard>} />
        <Route path="/About" element={<About />} />
        <Route path="/Abo" element={<Abo />} />
        <Route path='/Generate' element={<AuthGuard><Generate /></AuthGuard>} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />

      </Routes>
  )
}

export default App
