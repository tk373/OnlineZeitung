import { useState } from 'react'
import './AddArticle.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import supabase from '../supabaseClient';
import {Button} from "@nextui-org/button";
import {Textarea} from "@nextui-org/react";


function AddArticle() {

  const [title, setTitle] = useState('');
  const [lead, setLead] = useState('');
  const [body, setBody] = useState('');

  // Eine Funktion, um die Formulardaten zu verarbeiten
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('articles')
      .insert([
        { title, lead, body },
      ]);

    if (error) {
      console.error('Es gab einen Fehler beim Einreichen Ihres Artikels:', error);
    } else {
      console.log('Artikel erfolgreich eingereicht:', data);
      // Hier können Sie den Nutzer informieren oder das Formular zurücksetzen
    }
  };
  

  return (
    <div className="App">
    <header>
      <Header></Header>
    </header>
    <div className="mainContent">
    <form className="article-form" onSubmit={handleSubmit}>  
      <div>
        <label htmlFor="title">Titel:</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
        />
      </div>
      <div>
        <label htmlFor="lead">Lead (Zusammenfassung):</label>
        <textarea
          id="lead"
          value={lead}
          onChange={(e) => setLead(e.target.value)}
          required
        />
      </div>
      <div>
        {/* <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        /> */}
        <Textarea
        isRequired
        label="Body"
        placeholder="Enter your Textbody"
        labelPlacement="outside"
        className="max-w-xs light"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <Button type="submit">Press me</Button>
    </form>
    </div>
    <Footer/>
  </div>
  )
}

export default AddArticle
