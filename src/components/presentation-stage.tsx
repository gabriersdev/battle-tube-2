'use client';

import React from 'react';
import {AnimatePresence} from 'framer-motion';
import {usePresentation} from './presentation-provider';
import {Screen} from './screen';
import {ProgressBar} from './progress-bar';
import {Controls} from './controls';
import Footer from "@/components/footer";
import Player from "@/components/player";
import Marquee from "@/components/marquee";

export const PresentationStage: React.FC = () => {
  const {currentScreen} = usePresentation();
  
  return (
    <div className="d-flex flex-column w-100">
      {/* Container da apresentação ocupando 100% da altura da viewport */}
      <div className="d-flex align-items-center justify-content-center w-100 vh-100 position-relative overflow-hidden">
        <ProgressBar/>
        
        <AnimatePresence mode="wait">
          <Screen key={currentScreen.id} data={currentScreen}/>
          {currentScreen.id === "screen-1" && <Marquee/>}
        </AnimatePresence>
        
        <Controls/>
        
        <Player/>
      </div>
      
      {/* Footer abaixo da apresentação, acessível via scroll */}
      <div className={"py-5 bg-body"} style={{borderTop: "2.5px solid #000"}}>
        <Footer variant={"wrapped"}/>
      </div>
    </div>
  );
};
