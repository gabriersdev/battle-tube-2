'use client';

import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {usePresentation} from './presentation-provider';
import {Screen, screenVariants} from './screen';
import {ProgressBar} from './progress-bar';
import {Controls} from './controls';
import Footer from "@/components/footer";
import Player from "@/components/player";
import Marquee from "@/components/marquee";

export const PresentationStage: React.FC = () => {
  const {currentScreen, isPlaying} = usePresentation();
  
  return (
    <div className="d-flex flex-column w-100">
      {/* Container da apresentação ocupando 100% da altura da viewport */}
      <div className={`d-flex align-items-center justify-content-center w-100 min-vh-100 position-relative ${currentScreen.id === "screen-1" ? 'bg-danger-subtle' : ''}`} style={{overflowX: "hidden"}}>
        <ProgressBar/>
        
        <AnimatePresence mode="wait">
          <Screen key={currentScreen.id} data={currentScreen} isPlaying={isPlaying}/>
          {currentScreen.id === "screen-1" && (
            <motion.div
              custom={{backgroundColor: 'bg-danger-subtle'}}
              variants={screenVariants}
              className={"d-none d-xl-block"}
              initial="initial"
              animate="animate"
              exit="exit">
              <Marquee paused={!isPlaying}/>
            </motion.div>
          )}
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
