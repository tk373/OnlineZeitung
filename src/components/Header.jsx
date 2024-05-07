import React from 'react';
import './Header.css'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react"

function Header() {
  return (
    <header className="header">
      <div className="header-align-left">
        <Link href="./">
          <img className="Logo" src="./Logo2.svg" alt="Logo" width="70" height="100" />
        </Link>
      </div>
      <div className="header-align-right">
        <Navbar>
          <NavbarContent>
            <NavbarMenuToggle aria-label="Open Menu" />
            <NavbarBrand>
              Menu
            </NavbarBrand>
            <NavbarMenu aria-label="Header Actions">
              <NavbarMenuItem> <Link class="text-black" href='./'>Diheime</Link> </NavbarMenuItem>
              <NavbarMenuItem> <Link class="text-black" href='./About'>Über eus</Link> </NavbarMenuItem>
              <NavbarMenuItem> <Link class="text-black" href='./'>Kontakt</Link> </NavbarMenuItem>
              <NavbarMenuItem> <Link class="text-black" href='./Abo'>Abo</Link> </NavbarMenuItem>
              <NavbarMenuItem> <Link class="text-black" href='./Add'>Hinzufügen</Link> </NavbarMenuItem>
              <NavbarMenuItem> <Link class="text-black" href='./Generate'>Generiere</Link> </NavbarMenuItem>
            </NavbarMenu>
          </NavbarContent>
        </Navbar>
      </div>
    </header>
  );
}

export default Header;