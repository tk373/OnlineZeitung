import React from 'react';
import './Abo.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Card, CardHeader, CardBody } from "@nextui-org/react";

function Abo() {
  return (
    <div className="App">
      <Header />
      <div className="aboContent">
        <Card className="titleWrapper">
          <CardHeader>
            <h1>Unser Abo</h1>
          </CardHeader>
          <CardBody>
            <p>Mit unserem Abo hast du die Macht von GPT-4 an deiner Seite, um Artikel zu jedem Thema zu generieren oder zusammenzufassen - inklusive Quellenangabe.</p>
          </CardBody>
        </Card>
        <div className="textWrapper">
          <Card className="textSegment">
            <CardHeader>
              <h2>Generieren</h2>
            </CardHeader>
            <CardBody>
              <p>Generiere tiefgründige, gut recherchierte Artikel zu Themen deiner Wahl. Unsere KI stützt sich auf die neueste Technologie von GPT-4, um dir Inhalte von höchster Qualität zu liefern.</p>
            </CardBody>
          </Card>
          <Card className="textSegment">
            <CardHeader>
              <h2>Zusammenfassen</h2>
            </CardHeader>
            <CardBody>
              <p>Erhalte Zusammenfassungen von unseren Artikeln mit der Power von GPT-4. Ideal für schnelles Erfassen von Informationen und zum Gewinnen von Einsichten in kürzester Zeit.</p>
            </CardBody>
          </Card>
          <Card className="textSegment">
            <CardHeader>
              <h2>Vertrauen</h2>
            </CardHeader>
            <CardBody>
              <p>Bei dieser revolutionären Technologie kannst du deine eigenen Quellen angeben. So kannst du deine Recherche schneller gestalten und dich auf die Informationen verlassen</p>
            </CardBody>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Abo;
