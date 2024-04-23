import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AddArticle from './Pages/AddArticle';
import Welcome from './Pages/Welcome';
import About from './Pages/About';
import Abo from './Pages/Abo';
import Generate from './Pages/Generate';
import Register from './Pages/Register';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Add" element={<AddArticle />} />
        <Route path="/About" element={<About />} />
        <Route path="/Abo" element={<Abo />} />
        <Route path='/Generate' element={<Generate />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
