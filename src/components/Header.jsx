import React, { useRef, useEffect, useState } from 'react';
import './Header.css';
import supabase from '../supabaseClient';
import { Button, Input, Spacer, Tabs, Tab } from '@nextui-org/react';
import { db } from '../firebaseClient';
import { doc, getDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userTier, setUserTier] = useState(null);
  const [session, setSession] = useState(null);
  const location = useLocation();

  const tierPriority = {
    'user': 1,
    'abo': 2,
    'author': 3,
    'admin': 4
  };

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        await fetchUserTier(session.user.id);
      }
    };

    const fetchUserTier = async (userId) => {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const tier = userDoc.data().userTier;
        setUserTier(tier);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserTier(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) console.log('Logout error:', error.message);
  };
  
  return (
    <>
      <header className="header">
        <div className="logo">
          <a href="/">
            <img src="../Logo2.svg" alt="Logo" width="70" height="100" />
          </a>
        </div>
        <div>
          <Tabs selectedKey={location.pathname} aria-label="Tabs">
          <Tab key="/" href="/" title="D'Poscht" />
          <Tab key="/Community" href="/Community" title="Community" />
        </Tabs>
        <Button color="primary" startContent={<FaLock />}>
        Abo
        </Button></div>
        <button className="menu-toggle" onClick={toggleMenu}>Menu</button>
        <div className={`menu ${isMenuOpen ? 'open' : 'closed'}`}>
          <Spacer y={1} />
          <a href="/" className="menu-item">Diheime</a>
          <a href="/About" className="menu-item">Über eus</a>
          <a href="/Abo" className="menu-item">Abo</a>
          {userTier && tierPriority[userTier] >= tierPriority['abo'] && (
             <>
             <a href="/Generate" className="menu-item">Generiere</a>
           </>
          )}
          {userTier && tierPriority[userTier] >= tierPriority['author'] && (
            <>
              <a href="/Add" className="menu-item">Hinzufügen</a>
            </>
          )}
          {session ? (
            <button onClick={handleLogout} className="menu-item logout-button">Logout</button>
          ) : (
            <a href="/Login" className="menu-item">Login</a>
          )}
        </div>
      </header>
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Header;