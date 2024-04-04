import React, { useState } from 'react';
import './Generate.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Card, CardHeader, CardBody, Tabs, Tab, Accordion, AccordionItem, Input, Button, Textarea } from "@nextui-org/react";

function Generate() {
    // State für den Artikel-Prompt
    const [articlePrompt, setArticlePrompt] = useState('');
    
    // State für die URLs der Quellen
    const [sourceURLs, setSourceURLs] = useState({1: '', 2: '', 3: ''});

    // Handler-Funktion für die Änderungen im Artikel-Prompt
    const handleArticlePromptChange = (event) => {
        setArticlePrompt(event.target.value);
    };

    // Handler-Funktion für die Änderungen in den Quellen-URLs
    const handleSourceChange = (key, value) => {
        setSourceURLs(prevURLs => ({ ...prevURLs, [key]: value }));
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
                                        <Button radius="full" className="bg-gradient-to-tr from-[#00737A] to-blue-300 text-white shadow-lg">
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
                                    <Textarea
                                        isReadOnly
                                        variant="bordered"
                                        labelPlacement="outside"
                                        defaultValue="Hier wird dein generierter Artikel angezeigt."
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
