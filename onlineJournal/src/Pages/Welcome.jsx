import { useState } from 'react'
import './Welcome.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function Welcome() {
  

  return (
    <div className="App">
      <header>
        <Header></Header>
      </header>
      <div className="mainContent">
        <div className="ContentTitel">
            <h1>
                Herzlich willkomme uf de Homepage vo de Poscht
            </h1>
            <p>
                Ihrer vertrauenswürdigen Quelle für Nachrichten und Analysen. Bei uns finden Sie tiefgehende Berichterstattung zu den wichtigsten Themen unserer Zeit – von lokalen Ereignissen bis hin zu globalen Entwicklungen. 
            </p>
            <p>
            Wir sind stolz darauf, Ihnen eine Plattform bieten zu können, auf der Journalismus noch echte Bedeutung hat. Entdecken Sie mit uns die Geschichten, die die Welt bewegen. Vielen Dank, dass Sie uns gewählt haben, um informiert zu bleiben.
            </p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Welcome