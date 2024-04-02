import { useState, useEffect } from 'react'
import './Welcome.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import supabase from '../supabaseClient.js'
import {CardBody, CardHeader, Card} from "@nextui-org/react";

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
      <Footer/>
    </div>
  )
}

export default Welcome