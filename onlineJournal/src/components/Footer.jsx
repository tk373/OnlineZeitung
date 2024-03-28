import React from 'react';
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
            © {new Date().getFullYear()} D'Poscht. All rights reserved.
        </footer>
  );
}

export default Footer;