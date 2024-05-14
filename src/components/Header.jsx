import React, { useRef, useEffect, useState } from 'react';
import './Header.css'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react"

function Header() {
  const menuPortalRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);  // Toggle the state when the menu is opened/closed
  };

  
  return (
    <>
    <header className="header">
      {/* <div className="header-align-left">
        <Link href="./">
          <img className="Logo" src="./Logo2.svg" alt="Logo" width="70" height="100" />
        </Link>
      </div> */}
        <Navbar>
        <NavbarBrand>
        <Link href="./">
          <img className="Logo" src="./Logo2.svg" alt="Logo" width="70" height="100" />
        </Link>
        </NavbarBrand>
          <NavbarContent justify='end'>
            <p>Menu</p>
            <NavbarMenuToggle aria-label="Open Menu" onClick={toggleMenu}/>
            <NavbarMenu className='' aria-label="Header Actions" portalContainer={menuPortalRef.current}>
              <NavbarMenuItem> <Link class="text-black" href='./'>Diheime</Link> </NavbarMenuItem>
              <NavbarMenuItem> <Link class="text-black" href='./About'>Über eus</Link> </NavbarMenuItem>
              <NavbarMenuItem> <Link class="text-black" href='./'>Kontakt</Link> </NavbarMenuItem>
              <NavbarMenuItem> <Link class="text-black" href='./Abo'>Abo</Link> </NavbarMenuItem>
              <NavbarMenuItem> <Link class="text-black" href='./Add'>Hinzufügen</Link> </NavbarMenuItem>
              <NavbarMenuItem> <Link class="text-black" href='./Generate'>Generiere</Link> </NavbarMenuItem>
            </NavbarMenu>
          </NavbarContent>
        </Navbar>
      {/* Portal div positioned to cover part of the right side of the screen */}
      <div ref={menuPortalRef} className="menu-portal"></div>
    </header>
    {menuOpen && <div className="page-overlay"></div>}
    </>
  );
}

export default Header;