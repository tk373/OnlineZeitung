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
        <Card className="max-w-[80vw]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-7xl font-bold">Herzlich willkomme uf de Homepage vo de Poscht</p>
            </div>
          </CardHeader>
          <Divider />
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
      <div className="articlesContainer">
        {articles.map((article) => (
          <Card key={article.id} hoverable clickable>
            <CardHeader>
              <h3>{article.title}</h3>
            </CardHeader>
            <CardBody>
              <p>{article.lead}</p>
              <div>{article.body}</div>
            </CardBody>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Welcome