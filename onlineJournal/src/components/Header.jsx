import React from 'react';
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-align-left">
        <a href="./">
          <img className="Logo" src="./Logo2.svg" alt="Logo" width="70" height="100"/>
        </a>
      </div>
       <div className="header-align-right">
       <nav>
          <ul>
            <li><a href="./">Diheime</a></li>
            <li><a href="./About">Über eus</a></li>
            <li><a href="#">Kontakt</a></li>
            <li><a href="./Abo">Abo</a></li>
            <li><a href="./Add">Hinzufügen</a></li>
          </ul>
        </nav>
       </div>
    </header>
  );
}

export default Header;