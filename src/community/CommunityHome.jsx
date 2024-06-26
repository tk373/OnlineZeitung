import { useState, useEffect } from 'react'
import React from 'react';
import './CommunityHome.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { db } from '../firebaseClient'; // Import Firestore database
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import {
  Card, CardHeader, CardBody, CardFooter, Divider, Image, Dropdown, Button,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react";
import ComponentGuard from '../auth/ComponentGuard';
import { Link } from 'react-router-dom';

function Community() {

  const [articles, setArticles] = useState([]);

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["heute ↓"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const fetchArticles = async () => {
    try {
      const q = query(collection(db, 'articles'), orderBy('title', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedArticles = [];
      querySnapshot.forEach((doc) => {
        fetchedArticles.push({ id: doc.id, ...doc.data() });
      });
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
            <div className="flex text-center w-full">
              <h1 className="text-7xl welcome">Community</h1>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="bodyContainer">
        <div className='titleContainer'>
          <h1 className='text-2xl mt-2'>Beste Artikel von der Community von</h1>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                className="text-2xl mt-1"
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu

              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem className="dropdown-item" key="heute ↓">Heute</DropdownItem>
              <DropdownItem className="dropdown-item" key="dieser Woche ↓">dieser Woche</DropdownItem>
              <DropdownItem className="dropdown-item" key="diesem Monat ↓">diesem Monat</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>


        <div className="articlesContainer">
          {articles.map((article) => {
            const [date, time] = article.created_at?.split('T') || ['', ''];
            const formattedTime = time.split('.')[0];
            return (
              <Link to={`/Home/article/${toUrlFriendly(article.title)}`} key={article.id} style={{ textDecoration: 'none' }}>
                <Card key={article.id} hoverable clickable>
                  <CardHeader className="flex items-center justify-between">
                    {article.default_image_url && (
                      <Image
                        src={article.default_image_url}
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

        <div className='subTitleContainer'>
          <Button variant='bordered'>
            Mehr
          </Button>
        </div>


      </div>
      <div className="becomeAuthor">
        <Card className="textSegment w-3/4 mx-auto">
          <CardHeader>
            <div className="flex flex-col text-center w-full">
              <h1 className="text-4xl welcome">Werde Gastautor bei der Poscht</h1>
              <div className="flex justify-center items-center mt-4">
                <div className="w-1/2 text-center">
                  <h1 className='text-2xl font-bold'>Befinde dich in den</h1>
                  <p className='w-2/3 mx-auto text-center'>Top 10 der best Bewerteten Artikeln der Woche</p>
                </div>
                <div className="w-1/2 text-center">
                  <h1 className='text-2xl font-bold'>... und erhalte</h1>
                  <p className='w-2/3 mx-auto text-center'>ein Feature deines Artikels auf der Mainpage</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>


      <Footer />
    </div>
  )
}

export default Community
