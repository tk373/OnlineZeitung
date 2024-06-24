import { useState, useEffect } from 'react'
import './CommunityHome.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import ComponentGuard from '../auth/ComponentGuard';

function Community() {


  return (
    <div className="App">
      <header>
        <Header></Header>
      </header>
      <div className="mainContent">
        <Card Card className="textSegment">
          <CardHeader>
            <div className="flex flex-col">
              <h1 className="text-7xl">Herzlich willkomme uf de Community Page vo de Poscht</h1>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="bodyContainer">
      <ComponentGuard requiredTier="abo">
     
      </ComponentGuard>
      </div>
      <Footer />
    </div>
  )
}

export default Community