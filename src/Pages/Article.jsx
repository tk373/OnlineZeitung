import React from 'react';
import './Article.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebaseClient';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { Spacer, Image } from "@nextui-org/react";
import ReactMarkdown from 'react-markdown';

function Article() {
    const { title } = useParams();
    const [article, setArticle] = useState(null);
    
    const fetchArticle = async () => {
      try {
        const q = query(collection(db, 'articles'), where('title', '==', title.replace(/-/g, ' ')));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setArticle(querySnapshot.docs[0].data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
  
    useEffect(() => {
      fetchArticle();
    }, [title]);
  
    if (!article) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className='App'>
        <header>
        <Header></Header>
        </header>
        <div className="article-container">
        <h1>{article.title}</h1>
        <Spacer y={4} />
        <p>{article.lead}</p>
        <Spacer y={4} />
        {article.image_url && (
                  <Image
                    src={article.image_url}
                    alt="Article image"
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                )}
        <Spacer y={4} />
        <div className="article-content">
        <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default Article;