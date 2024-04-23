import { useState } from 'react'
import './AddArticle.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import supabase from '../supabaseClient';
import {Button} from "@nextui-org/button";
import {Textarea, Input} from "@nextui-org/react";


function AddArticle() {

  const [title, setTitle] = useState('');
  const [lead, setLead] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

const handleImageChange = (event) => {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    setImage(file);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  let imageUrl = null;
  if (image) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`; // Generates a unique file name
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('Images')
      .upload(fileName, image);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return;
    }

    // Generate a signed URL for the uploaded image
    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from('Images')
      .createSignedUrl(fileName, 60 * 60 * 24); // URL expires in 24 hours

    if (signedUrlError) {
      console.error('Error generating signed URL:', signedUrlError);
      return;
    }

    imageUrl = signedUrlData.signedUrl;
  }

  // Insert article data including the signed URL
  const { data, error } = await supabase
    .from('articles')
    .insert([
      { title, lead, body, image_url: imageUrl },
    ]);

  if (error) {
    console.error('Error saving the article:', error);
  } else {
    // Reset form state
    setTitle('');
    setLead('');
    setBody('');
    setImage(null);
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
        placeholder="Enter your Textbody"
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
        placeholder="Enter your Textbody"
        labelPlacement="outside"
        className="max-w-xs light"
        value={lead}
        onChange={(e) => setLead(e.target.value)}
        />
      </div>
      <div>
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
      <div>
   <Input
   label="Image"
     type="file"
     id="image"
     accept="image/*"
     labelPlacement="outside"
     onChange={handleImageChange}
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
