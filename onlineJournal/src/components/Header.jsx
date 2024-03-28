import React from 'react';
import './Header.css'

function Header() {
  return (
    <header className="header">
    <div className="header-align-left">
        <img className="Logo" src="./Logo2.svg" alt="Logo" width="70" height="100" />
        <h1>D'POSCHT</h1>
    </div>
     <div className="header-align-right">
     <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
     </div>
    </header>
  );
}

export default Header;