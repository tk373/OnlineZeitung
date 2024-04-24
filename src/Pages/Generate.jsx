import React, { useState } from 'react';
import './Generate.css';
import configData from '../../config.json';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Card, CardHeader, CardBody, Tabs, Tab, Accordion, AccordionItem, Input, Button, Textarea } from "@nextui-org/react";

function Generate() {
    const [articlePrompt, setArticlePrompt] = useState('');
    const [sourceURLs, setSourceURLs] = useState({ 1: '', 2: '', 3: '' });
    const [generatedArticle, setGeneratedArticle] = useState('Hier wird dein generierter Artikel angezeigt.');
    const [scraperResponse, setScraperResponse] = useState(null);

    const handleArticlePromptChange = (event) => {
        setArticlePrompt(event.target.value);
    };

    const handleSourceChange = (key, value) => {
        setSourceURLs(prevURLs => ({ ...prevURLs, [key]: value }));
    };

    const fetchContent = async (sourceUrl) => {
        const scraperApiUrl = `https://dposchtbackend.azurewebsites.net/fetch-content?url=${encodeURIComponent(sourceUrl)}`;
        try {
            const response = await fetch(scraperApiUrl);
            const data = await response.json();
            console.log('Fetched content for URL:', sourceUrl, data);
            return data.content; // Assuming the JSON has a content field with the text
        } catch (error) {
            console.error('Error fetching content:', error);
            return ''; // Return an empty string in case of an error
        }
    };

    const fetchContentFromScraper = async (sourceUrl) => {
        // Replace 'yourAzureServiceBaseUrl' with the actual base URL of your Azure service
        const scraperApiUrl = `https://dposchtbackend.azurewebsites.net/fetch-content?url=${encodeURIComponent(sourceUrl)}`;

        try {
            const response = await fetch(scraperApiUrl);
            const data = await response.json();
            setScraperResponse(data); // Store the response data in state (if needed)
            console.log('Scraper response:', data); // Log the data to the console
        } catch (error) {
            console.error('Error fetching content:', error);
            // You can set the error in the state as well if needed, or handle it accordingly
        }
    };

    

    const generateArticle = async () => {
        // Fetch content from all source URLs
        const contentPromises = Object.values(sourceURLs).map(url => url ? fetchContent(url) : '');
        const contents = await Promise.all(contentPromises); // Wait for all content fetches to complete

        // Prepare the text to be sent to the OpenAI API
        const sourceTexts = contents.map((content, index) => `Quelle ${index + 1}: ${content}`).join('\n\n');

        const apiURL = 'https://api.openai.com/v1/chat/completions';
        const apiKey = process.env.API_KEY;
        const max_tokens = 400 * 4;

        const data = {
            model: "gpt-3.5-turbo-0125",
            messages: [
                {
                    role: "user",
                    content: `Generiere mir einen Artikel über ${articlePrompt}. Verwende unter anderem die folgenden Inhalte als Quellen:\n\n${sourceTexts}`
                }
            ],
            temperature: 0.7,
            max_tokens: max_tokens
        };

        try {
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result && result.choices && result.choices.length > 0) {
                setGeneratedArticle(result.choices[0].message.content);
            } else {
                setGeneratedArticle('Keine Antwort erhalten. Bitte überprüfen Sie den Prompt und versuchen Sie es erneut.');
            }
        } catch (error) {
            console.error('Fehler bei der Generierung des Artikels:', error);
            setGeneratedArticle('Es gab einen Fehler bei der Generierung des Artikels. Bitte versuche es später erneut.');
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="aboContent">
                <Card className="titleWrapper">
                    <CardHeader>
                        <h1>Artikel Generieren</h1>
                    </CardHeader>
                    <CardBody>
                        <p>Nutze die Kraft von GPT-4, um auf Knopfdruck maßgeschneiderte Artikel zu generieren - einfach Prompt eingeben und Quellen hinzufügen.</p>
                    </CardBody>
                </Card>
                <div className="flex w-full flex-col items-center max-w-md">
                    <Tabs aria-label="Options">
                        <Tab key="input" title="Input">
                            <Card className="textSegment">
                                <CardHeader>
                                    <h2>Promt und Quellen</h2>
                                </CardHeader>
                                <CardBody>
                                    <Input label="Generiere einen Artikel über" value={articlePrompt} onChange={handleArticlePromptChange} />
                                    <Accordion variant="bordered" className='mt-10'>
                                        {Object.keys(sourceURLs).map((key) => (
                                            <AccordionItem key={key} aria-label={`Quelle ${key}`} title={`Quelle ${key}`}>
                                                <Input type="url" value={sourceURLs[key]} onChange={(e) => handleSourceChange(key, e.target.value)} startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <span className="text-default-400 text-small"></span>
                                                    </div>
                                                } />
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                    <div className="buttonContainer">
                                        <Button onClick={generateArticle} radius="full" className="bg-gradient-to-tr from-[#00737A] to-blue-300 text-white shadow-lg">
                                            Generate
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="output" title="Output">
                            <Card className="textSegment">
                                <CardHeader>
                                    <h2>Output</h2>
                                </CardHeader>
                                <CardBody>
                                    <Textarea className='text-xl'
                                        isReadOnly
                                        variant="bordered"
                                        labelPlacement="outside"
                                        value={generatedArticle}

                                    />
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Generate;
