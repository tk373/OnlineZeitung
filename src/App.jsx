import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AddArticle from './Pages/AddArticle';
import Welcome from './main/Welcome.jsx';
import About from './Pages/About';
import Abo from './Pages/Abo';
import Generate from './Pages/Generate';
import Register from './auth/Register.jsx';
import Login from './auth/Login.jsx';
import AuthGuard from './auth/AuthGuard';
import Article from './main/Article.jsx';
import UnauthorizedPage from './auth/unauthorized.jsx';
import Layout from './assets/Layout.jsx';
import Community from './community/CommunityHome.jsx';

function App() {
  

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Add" element={<AuthGuard requiredTier="author"><AddArticle /></AuthGuard>} />
        <Route path="/About" element={<About />} />
        <Route path="/Abo" element={<Abo />} />
        <Route path='/Generate' element={<AuthGuard requiredTier="abo"><Generate /></AuthGuard>} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path="/article/:title" element={<Article />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Layout>
  )
}

export default App
