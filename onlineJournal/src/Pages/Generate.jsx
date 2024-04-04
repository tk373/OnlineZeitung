import React from 'react';
import './Generate.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Card, CardHeader, CardBody, Tabs, Tab, Accordion, AccordionItem, Input, Button, Textarea } from "@nextui-org/react";

function Generate() {
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
                                    <Input type="email" label="Generiere einen Artikel über" />
                                    <Accordion variant="bordered" className='mt-10'>
                                        <AccordionItem key="1" aria-label="Quelle 1" title="Quelle   1">
                                            <Input type="url" startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">https://</span>
                                                </div>
                                            } />
                                        </AccordionItem>
                                        <AccordionItem key="2" aria-label="Quelle 2" title="Quelle 2">
                                            <Input type="url" startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">https://</span>
                                                </div>
                                            } />
                                        </AccordionItem>
                                        <AccordionItem key="3" aria-label="Quelle 3" title="Quelle 3">
                                            <Input type="url" startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">https://</span>
                                                </div>
                                            } />
                                        </AccordionItem>
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
                                        placeholder="Enter your description"
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
