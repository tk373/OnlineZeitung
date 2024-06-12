import React, { useRef, useEffect, useState } from 'react';
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  
  return (
    <>
      <header className="header">
        <div className="logo">
          <a href="/">
            <img src="../Logo2.svg" alt="Logo" width="70" height="100" />
          </a>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>Menu</button>
        <div className={`menu ${isMenuOpen ? 'open' : 'closed'}`}>
          <a href="/" className="menu-item">Diheime</a>
          <a href="/About" className="menu-item">Über eus</a>
          <a href="/Abo" className="menu-item">Abo</a>
          <a href="/Add" className="menu-item">Hinzufügen</a>
          <a href="/Generate" className="menu-item">Generiere</a>
        </div>
      </header>
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Header;