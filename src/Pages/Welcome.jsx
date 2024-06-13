
import { useState, useEffect } from 'react'
import './Welcome.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Article from '../Pages/Article.jsx'
import { db } from '../firebaseClient'; // Import Firestore database
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import ComponentGuard from '../auth/ComponentGuard';
import { Link } from 'react-router-dom';

function Welcome() {

  const [articles, setArticles] = useState([]);


  const fetchArticles = async () => {
    try {

      const response = await fetch('https://dposchtbackend.azurewebsites.net/articles'); // Adjust the URL based on your environment
      const fetchedArticles = await response.json();
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const toUrlFriendly = (title) => {
    return title.replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };


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
        </Card>
      </div>
      <div className="bodyContainer">
      <ComponentGuard requiredTier="abo">
      <div className="articlesContainer">
      {articles.map((article) => {
          const [date, time] = article.created_at?.split('T') || ['', '']; // Handle missing 'created_at'
          const formattedTime = time.split('.')[0];
          return (
            <Link to={`/article/${toUrlFriendly(article.title)}`} key={article.id} style={{ textDecoration: 'none' }}>
            <Card key={article.id} hoverable clickable>
              <CardHeader className="flex items-center justify-between">
                {article.image_url && (
                  <Image
                    src={article.image_url}
                    alt="Article image"
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                )}
              </CardHeader>
              <CardBody>
                <h2 className="font-bold text-lg">{article.title}</h2>
                <p>{article.lead}</p>
              </CardBody>
              <CardFooter>
                <span className="text-default-400 text-xs">{date} · {formattedTime}</span>
              </CardFooter>
            </Card>
            </Link>
          );
        })}
      </div>
      </ComponentGuard>
      </div>
      <Footer />
    </div>
  )
}

export default Welcome