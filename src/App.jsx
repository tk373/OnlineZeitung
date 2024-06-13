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
import Article from './Pages/Article.jsx'
import UnauthorizedPage from './auth/unauthorized.jsx';
import Layout from './assets/Layout.jsx';

function App() {
  

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Add" element={<AuthGuard requiredTier="admin"><AddArticle /></AuthGuard>} />
        <Route path="/About" element={<About />} />
        <Route path="/Abo" element={<Abo />} />
        <Route path='/Generate' element={<AuthGuard requiredTier="abo"><Generate /></AuthGuard>} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path="/article/:title" element={<Article />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Layout>
  )
}

export default App
