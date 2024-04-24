import React, { useState } from 'react';
import axios from 'axios';
import './Generate.css';
import configData from '../../config.json';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Card, CardHeader, CardBody, Tabs, Tab, Accordion, AccordionItem, Input, Button, Textarea } from "@nextui-org/react";
require('dotenv').config();

function Generate() {
    const [articlePrompt, setArticlePrompt] = useState('');
    const [sourceURLs, setSourceURLs] = useState({ 1: '', 2: '', 3: '' });
    const [generatedArticle, setGeneratedArticle] = useState('Hier wird dein generierter Artikel angezeigt.');
    const apiKey = process.env.API_KEY;
    const headers = {

    }

    const handleArticlePromptChange = (event) => {
        setArticlePrompt(event.target.value);
    };

    const handleSourceChange = (key, value) => {
        setSourceURLs(prevURLs => ({ ...prevURLs, [key]: value }));
    };

    const generateArticle = async () => {
        const apiURL = 'https://api.openai.com/v1/chat/completions';
       // const apiKey = configData.API_KEY;
       console.log('My API Key:', apiKey);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        };


        // Berechnung der Token-Anzahl basierend auf der gewünschten Wortanzahl
        // 400 Wörter * 4 Bytes (Token) pro Wort als grobe Schätzung
        const max_tokens = 400 * 4;

        const sourceTexts = Object.values(sourceURLs).map(url => `Quelle: ${url}`).join(' ');

        const data = {
            model: "gpt-4-0125-preview",
            messages: [
                {
                    role: "user",
                    content: `Generiere mir einen Artikel über ${articlePrompt}. Beutze unter anderem die Quellen ${sourceTexts}` // Integration des Prompts und der Quellen
                }
            ],
            temperature: 0.7,
            max_tokens: max_tokens
        };

        try {
            const response = await axios.post(apiURL, data, config);
            if (response.data && response.data.choices && response.data.choices.length > 0) {
                setGeneratedArticle(response.data.choices[0].message.content);
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
                                                        <span className="text-default-400 text-small">https://</span>
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