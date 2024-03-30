import { useState } from 'react'

import './About.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function About() {
  return (
    <div className="App">
      <Header />
      <div className="aboutContent">
        <div className="contentWrapper">
          <h1>Über Uns - D'Poscht</h1>
          <p>Herzlich willkommen auf der Seite von D'Poscht, Ihrem Tor zu sorgfältig recherchierten und verlässlichen Nachrichten. Wir sind ein Team engagierter Informatikmittelschüler, die eine Leidenschaft für fundierten Journalismus und die Verbreitung von Wissen teilen.</p>
          <p>Gegründet am 28. März 2024, entstand D'Poscht aus dem Wunsch heraus, eine Plattform zu schaffen, auf der Qualität vor Quantität steht. In einer Zeit, in der Informationen schnell und manchmal ungefiltert fließen, setzen wir auf gründliche Recherche, um sicherzustellen, dass jeder Artikel, den wir veröffentlichen, nicht nur informativ, sondern auch verlässlich ist.</p>
          <p>Unser Augenmerk liegt auf Themen, die für die Schweiz von Bedeutung sind – von lokalen Ereignissen bis hin zu globalen Entwicklungen, die unsere Gesellschaft beeinflussen könnten. Neben den Nachrichten nehmen wir uns auch die Zeit, um über Forschung und technologische Durchbrüche zu berichten, denn wir glauben, dass Verständnis für solche Themen wesentlich ist, um in unserer vernetzten Welt informierte Entscheidungen zu treffen.</p>
          <p>D'Poscht ist mehr als nur eine Zeitung; es ist ein Passion Project, das von einer Gruppe von Gleichgesinnten ins Leben gerufen wurde, die den Wert echter Nachrichten und tiefgreifender Analysen verstehen. Wir laden Sie ein, Teil unserer Reise zu werden, unsere Geschichten zu entdecken und durch unsere Artikel einen Einblick in die Welt zu gewinnen, der sowohl bereichernd als auch erhellend ist.</p>
          <p>Vielen Dank, dass Sie sich die Zeit genommen haben, uns besser kennenzulernen. Wir freuen uns darauf, Sie mit Nachrichten zu versorgen, die nicht nur gehört, sondern auch gefühlt werden können. </p>
          <p>Willkommen bei D'Poscht – wo jeder Artikel ein Stück unserer Leidenschaft für echten Journalismus trägt.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
