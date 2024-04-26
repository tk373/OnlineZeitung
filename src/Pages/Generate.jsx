import React, { useState } from 'react';
import './Generate.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Card, CardHeader, CardBody, Tabs, Tab, Accordion, AccordionItem, Input, Button, Textarea } from "@nextui-org/react";

function Generate() {
    const [articlePrompt, setArticlePrompt] = useState('');
    const [sourceURLs, setSourceURLs] = useState({ 1: '', 2: '', 3: '' });
    const [generatedArticle, setGeneratedArticle] = useState('Hier wird dein generierter Artikel angezeigt.');
    const [isGenerating, setIsGenerating] = useState(false);

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
            return data.content; // Assuming the JSON has a content field with the text
        } catch (error) {
            console.error('Error fetching content:', error);
            return ''; // Return an empty string in case of an error
        }
    };

    const generateArticle = async () => {
        setIsGenerating(true);
        // Fetch content from all source URLs
        const contentPromises = Object.values(sourceURLs).filter(url => url).map(fetchContent);
        const contents = await Promise.all(contentPromises);

        // Prepare the request body to be sent to your backend
        const requestBody = {
            articlePrompt: articlePrompt,
            sourceTexts: contents.join('\n\n') // Combine the text from all sources
        };

        try {
            // Make the POST request to your backend to generate the article
            const response = await fetch('https://dposchtbackend.azurewebsites.net/generate-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            const result = await response.json();
            if (result.article) {
                setGeneratedArticle(result.article);
            } else {
                setGeneratedArticle('Keine Antwort erhalten. Bitte überprüfen Sie den Prompt und versuchen Sie es erneut.');
            }
        } catch (error) {
            console.error('Fehler bei der Anfrage an das Backend:', error);
            setGeneratedArticle('Es gab einen Fehler bei der Anfrage an das Backend. Bitte versuche es später erneut.');
        } finally {
            setIsGenerating(false);
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
                                    <h2>Prompt und Quellen</h2>
                                </CardHeader>
                                <CardBody>
                                    <Input label="Generiere einen Artikel über" value={articlePrompt} onChange={handleArticlePromptChange} />
                                    <Accordion variant="bordered" className='mt-10'>
                                        {Object.keys(sourceURLs).map((key) => (
                                            <AccordionItem key={key} title={`Quelle ${key}`}>
                                                <Input type="url" value={sourceURLs[key]} onChange={(e) => handleSourceChange(key, e.target.value)} />
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                    <div className="buttonContainer">
                                        <Button onClick={generateArticle} disabled={isGenerating} radius="full" className="bg-gradient-to-tr from-[#00737A] to-blue-300 text-white shadow-lg">
                                            {isGenerating ? 'Generiere...' : 'Generiere Artikel'}
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
