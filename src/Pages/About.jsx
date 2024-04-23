import React from 'react';
import './About.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import {Tabs, Tab, Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

function About() {
  return (
    <div className="App">
      <Header />
      <div className="aboutContent">
        <Card className="titleWrapper">
          <CardHeader>
            <h1>Über Uns - D'Poscht</h1>
          </CardHeader>
          <CardBody>
            <p>Herzlich willkommen auf der Seite von D'Poscht, Ihrem Tor zu sorgfältig recherchierten und verlässlichen Nachrichten.</p>
          </CardBody>
        </Card>
        <div className="flex w-full flex-col items-center max-w-md">
        <Tabs aria-label="Options">
        <Tab key="gründung" title="Gründung">
          <Card className="textSegment">
            <CardHeader>
              <h2>Gründung</h2>
            </CardHeader>
            <CardBody>
              <p>Wir sind ein Team engagierter Informatikmittelschüler, die eine Leidenschaft für fundierten Journalismus und die Verbreitung von Wissen teilen. Gegründet am 28. März 2024, entstand D'Poscht aus dem Wunsch heraus, eine Plattform zu schaffen, auf der Qualität vor Quantität steht. In einer Zeit, in der Informationen schnell und manchmal ungefiltert fließen, setzen wir auf gründliche Recherche.</p>
            </CardBody>
          </Card>
          </Tab>
          <Tab key="fokus" title="Fokus">
          <Card className="textSegment">
            <CardHeader>
              <h2>Fokus</h2>
            </CardHeader>
            <CardBody>
              <p>Unser Augenmerk liegt auf Themen, die für die Schweiz von Bedeutung sind – von lokalen Ereignissen bis hin zu globalen Entwicklungen, die unsere Gesellschaft beeinflussen könnten. Neben den Nachrichten nehmen wir uns auch die Zeit, um über Forschung und technologische Durchbrüche zu berichten, denn wir glauben, dass Verständnis für solche Themen wesentlich ist, um in unserer Welt informierte Entscheidungen zu treffen.</p>
            </CardBody>
          </Card>
          </Tab>
          <Tab key="leidenschaft" title="Leidenschaft">
          <Card className="textSegment">
            <CardHeader>
              <h2>Leidenschaft</h2>
            </CardHeader>
            <CardBody>
              <p>D'Poscht ist mehr als nur eine Zeitung; es ist ein Passion Project, das von einer Gruppe von Gleichgesinnten ins Leben gerufen wurde, die den Wert echter Nachrichten und tiefgreifender Analysen verstehen. Wir laden Sie ein, Teil unserer Reise zu werden, unsere Geschichten zu entdecken und durch unsere Artikel einen Einblick in die Welt zu gewinnen, der sowohl bereichernd als auch erhellend ist.</p>
            </CardBody>
          </Card>
          </Tab>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
