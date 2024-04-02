import { useState } from 'react';
import './Abo.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

function Abo() {
  return (
    <div className="App">
      <Header />
      <div className="aboContent">
        <div className="titleWrapper">
          <h1>Unser Abo</h1>
          <p>Mit unserem Abo hast du die Macht von GPT-4 an deiner Seite, um Artikel zu jedem Thema zu generieren oder zusammenzufassen - inklusive Quellenangabe.</p>
        </div>
        <div className="textWrapper">
          <div className="textSegment">
            <h2>Generieren</h2>
            <p>Generiere tiefgründige, gut recherchierte Artikel zu Themen deiner Wahl. Unsere KI stützt sich auf die neueste Technologie von GPT-4, um dir Inhalte von höchster Qualität zu liefern.</p>
          </div>
          <div className="textSegment">
            <h2>Zusammenfassen</h2>
            <p>Erhalte Zusammenfassungen von unseren Artikeln mit der Power von GPT-4. Ideal für schnelles Erfassen von Informationen und zum Gewinnen von Einsichten in kürzester Zeit.</p>
          </div>
          <div className="textSegment">
            <h2>Vertrauen</h2>
            <p>Bei dieser revolutionären Technologie kannst du deine eigenen Quellen angeben. So kannst du deine Recherche schneller gestalten und dich auf die Informationen verlassen</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Abo;
