import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AddArticle from './Pages/AddArticle';
import Welcome from './Pages/Welcome';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Add" element={<AddArticle />} />
      </Routes>
    </Router>
  )
}

export default App
