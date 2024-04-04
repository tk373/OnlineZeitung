import { useState, useEffect } from 'react'
import './Welcome.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import supabase from '../supabaseClient.js'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

function Welcome() {

  const [articles, setArticles] = useState([]);

  // Funktion zum Abrufen der Artikel aus Supabase
  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*');

    if (error) {
      console.error('Fehler beim Abrufen der Artikel:', error);
      return;
    }

    setArticles(data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);


  return (
    <div className="App">
      <header>
        <Header></Header>
      </header>
      <div className="mainContent">
        <Card Card className="textSegment">
          <CardHeader>
            <div className="flex flex-col">
              <h1 className="text-7xl">Herzlich willkomme uf de Homepage vo de Poscht</h1>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-2xl">
              Ihrer vertrauenswürdigen Quelle für Nachrichten und Analysen. Bei uns finden Sie tiefgehende Berichterstattung zu den wichtigsten Themen unserer Zeit – von lokalen Ereignissen bis hin zu globalen Entwicklungen.
              <br></br>
              <br></br>
              Wir sind stolz darauf, Ihnen eine Plattform bieten zu können, auf der Journalismus noch echte Bedeutung hat. Entdecken Sie mit uns die Geschichten, die die Welt bewegen. Vielen Dank, dass Sie uns gewählt haben, um informiert zu bleiben.
            </p>

          </CardBody>
        </Card>
      </div>
      <div className="bodyContainer">
      <div className="articlesContainer">
      {articles.map((article) => {
          // Splitting the ISO string into date and time
          const [date, time] = article.created_at.split('T');
          const formattedTime = time.split('.')[0]; // Removing milliseconds for cleaner display
          return (
            <Card key={article.id} hoverable clickable>
              <CardHeader className="flex items-center">
                <div className="flex gap-3 justify-between">
                  <h2 className="font-bold">{article.title}</h2>
                  <span className="text-default-400">{date} · {formattedTime}</span>
                </div>
              </CardHeader>
              <CardBody>
                <p>{article.lead}</p>
              </CardBody>
            </Card>
          );
        })}
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Welcome