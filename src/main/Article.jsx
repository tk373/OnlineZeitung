import React from 'react';
import './Article.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebaseClient';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Spacer, Image } from "@nextui-org/react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkHtml from 'remark-html';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkSlug from 'remark-slug';
import remarkToc from 'remark-toc';
import rehypeRaw from 'rehype-raw';

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
    return <div>Loading...Not Found</div>;
  }

  const paragraphs = article.body.split('\n\n');

  return (
    <div className='App'>
      <header>
        <Header />
      </header>
      <div className="article-container">
        <h1>{article.title}</h1>
        <Spacer y={4} />
        <p>{article.lead}</p>
        <Spacer y={4} />
        {article.default_image_url && (
          <Image
            src={article.default_image_url}
            alt="Article image"
            width="100%"
            height="auto"
            objectFit="cover"
          />
        )}
        <Spacer y={4} />
        <div className="article-content">
        {paragraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
             <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks, remarkHtml, remarkMath, remarkSlug, remarkToc]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}>
               {paragraph}
              </ReactMarkdown>
              {index < paragraphs.length - 1 && (
                <Spacer y={getNextElementSpacer(paragraphs[index])} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function getNextElementSpacer(nextParagraph) {
  if (nextParagraph.startsWith('<h2>') || nextParagraph.startsWith('![')) {
    console.log(nextParagraph);
    return 2;
  }
  console.log(nextParagraph);
  return 10;
}

export default Article;
