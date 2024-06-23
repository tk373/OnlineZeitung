import { useState } from 'react';
import './AddArticle.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { app, db } from '../firebaseClient';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Button, Textarea, Input, Spacer } from '@nextui-org/react';

function AddArticle() {
  const [title, setTitle] = useState('');
  const [lead, setLead] = useState('');
  const [defaultImage, setDefaultImage] = useState(null);
  const [contentItems, setContentItems] = useState([{ type: 'paragraph', text: '' }]);
  const [inputKey, setInputKey] = useState(Date.now());

  const handleDefaultImageChange = (event) => {
    if (event.target.files.length > 0) {
      setDefaultImage(event.target.files[0]);
    }
  };

  const handleContentChange = (index, value) => {
    const newItems = [...contentItems];
    newItems[index].text = value;
    setContentItems(newItems);
  };

  const handleAddContent = (type) => {
    setContentItems([...contentItems, { type: type, text: '' }]);
  };

  const handleImageChange = (event, index) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const newItems = [...contentItems];
      newItems[index].file = file;
      setContentItems(newItems);
    }
  };

  const handleClearImage = (index) => {
    const newItems = [...contentItems];
    delete newItems[index].file;
    setContentItems(newItems);
    setInputKey(Date.now());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let bodyContent = '';
    let defaultImageUrl = null;

    if (defaultImage) {
      const storage = getStorage(app);
      const fileExt = defaultImage.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const imageRef = ref(storage, `defaultImages/${fileName}`);
      try {
        await uploadBytes(imageRef, defaultImage);
        defaultImageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.error('Error uploading default image:', error);
      }
    }

    for (const item of contentItems) {
      switch (item.type) {
        case 'paragraph':
          bodyContent += `<p>${item.text}</p>\n\n`;
          break;
        case 'heading':
          bodyContent += `<h2>${item.text}</h2>\n\n`;
          break;
        case 'image':
          if (item.file) {
            const storage = getStorage(app);
            const fileExt = item.file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const imageRef = ref(storage, `images/${fileName}`);
            try {
              await uploadBytes(imageRef, item.file);
              const imageUrl = await getDownloadURL(imageRef);
              bodyContent += `<img src="${imageUrl}" alt="Image">\n\n`;
            } catch (error) {
              console.error('Error uploading image:', error);
            }
          }
          break;
      }
    }

    const articleData = {
      title,
      lead,
      default_image_url: defaultImageUrl,
      body: bodyContent
    };

    try {
      await addDoc(collection(db, 'articles'), articleData);
    } catch (error) {
      console.error('Error saving the article:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="mainContent">
        <form className="article-form" onSubmit={handleSubmit}>
          <Textarea
            isRequired
            label="Title"
            placeholder="Enter the Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            isRequired
            label="Lead"
            placeholder="Enter the Lead"
            value={lead}
            onChange={(e) => setLead(e.target.value)}
          />
          <div>
            <label>Default Image:</label>
            <input
              key={inputKey}
              type="file"
              accept="image/*"
              onChange={handleDefaultImageChange}
            />
          </div>
          {contentItems.map((item, index) => (
            <div key={index}>
              {item.type === 'paragraph' && (
                <Textarea
                  isRequired
                  label={`Paragraph ${index + 1}`}
                  placeholder="Enter your paragraph"
                  value={item.text}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                />
              )}
              {item.type === 'heading' && (
                <Input
                  isRequired
                  label={`Heading ${index + 1}`}
                  placeholder="Enter your heading"
                  value={item.text}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                />
              )}
              {item.type === 'image' && (
                <div>
                  <input
                    key={inputKey + index}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  {item.file && (
                    <button onClick={() => handleClearImage(index)} style={{ marginLeft: '10px' }}>✕</button>
                  )}
                </div>
              )}
            </div>
          ))}
          <Button onClick={() => handleAddContent('paragraph')}>Add Paragraph</Button>
          <Button onClick={() => handleAddContent('heading')}>Add Heading</Button>
          <Button onClick={() => handleAddContent('image')}>Add Image</Button>
          <Spacer y={1} />
          <Button type="submit">Publish</Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddArticle;
