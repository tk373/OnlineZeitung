import { useState } from 'react'
import './AddArticle.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { app, db } from '../firebaseClient'; // Updated import to match named exports
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import {Button} from "@nextui-org/button";
import {Textarea, Input, Spacer} from "@nextui-org/react";


function AddArticle() {

  const [title, setTitle] = useState('');
  const [lead, setLead] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now());
  const [paragraphs, setParagraphs] = useState(['']);

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setInputKey(Date.now()); 
};

const handleParagraphChange = (index, value) => {
  const newParagraphs = [...paragraphs];
  newParagraphs[index] = value;
  setParagraphs(newParagraphs);
};

const handleAddParagraph = () => {
  setParagraphs([...paragraphs, '']);
};

const handleSubmit = async (event) => {
  event.preventDefault();

  let imageUrl = null;
  if (image) {
    const storage = getStorage(app);
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const imageRef = ref(storage, `images/${fileName}`);

    try {
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    } catch (error) {
      console.error('Error uploading image:', error);
      return;
    }
  }

  // Firestore to insert article data
  try {
    await addDoc(collection(db, 'articles'), {
      title,
      lead,
      body: paragraphs.join('\n\n'),
      image_url: imageUrl,
    });

    // Reset form state
    setTitle('');
    setLead('');
    setParagraphs(['']);
    setImage(null);
    setInputKey(Date.now());
  } catch (error) {
    console.error('Error saving the article:', error);
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
        <Textarea
        isRequired
        label="Title"
        placeholder="Enter the Title"
        labelPlacement="outside"
        className="max-w-xs light"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
         <Textarea
        isRequired
        label="Lead"
        placeholder="Enter the Lead"
        labelPlacement="outside"
        className="max-w-xs light"
        value={lead}
        onChange={(e) => setLead(e.target.value)}
        />
      </div>
      <div>
      {paragraphs.map((paragraph, index) => (
            <div key={index}>
              <Textarea
                isRequired
                label={`Paragraph ${index + 1}`}
                placeholder="Enter your paragraph"
                labelPlacement="outside"
                className="max-w-xs light"
                value={paragraph}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
              />
            </div>
          ))}
          <Button type="button" onClick={handleAddParagraph}>
            Add Paragraph
          </Button>
      </div>
      <div>
      <Spacer y={3} />
      <input
    key={inputKey}
    type="file"
    id="image"
    accept="image/*"
    onChange={handleImageChange}
  />
  {image && (
    <button onClick={handleClearImage} style={{ marginLeft: '10px' }}>✕</button>
  )}
    </div>
    <Spacer y={1} />
      <Button type="submit">Publish</Button>
    </form>
    </div>
    <Footer/>
  </div>
  )
}

export default AddArticle
