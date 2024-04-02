import React from 'react';
import './Header.css'
import { Button } from "@nextui-org/react"

function Header() {
  return (
    <header className="header">
      <div className="header-align-left">
        <a href="./">
          <img className="Logo" src="./Logo2.svg" alt="Logo" width="70" height="100" />
        </a>
      </div>
      <div className="header-align-right">
        <div className='flex gap-4 items-center'>
          <Button className='nav-button' variant="ghost" size="lg" radius="sm" as="a" href="./">Diheime</Button>
        <Button className='nav-button' variant="ghost" size="lg" radius="sm" as="a" href="./About">Über eus</Button>
        <Button className='nav-button' variant="ghost" size="lg" radius="sm" as="a" href="#">Kontakt</Button>
        <Button className='nav-button' variant="ghost" size="lg" radius="sm" as="a" href="./Abo">Abo</Button>
        <Button className='nav-button' variant="ghost" size="lg" radius="sm" as="a" href="./Add">Hinzufügen</Button>
        </div>
        
      </div>
    </header>
  );
}

export default Header;