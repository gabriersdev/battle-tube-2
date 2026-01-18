'use client';

import React, {useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {usePresentation} from './presentation-provider';
import {Screen, screenVariants} from './screen';
import {ProgressBar} from './progress-bar';
import {Controls} from './controls';
import Footer from "@/components/footer";
import Player from "@/components/player";
import Marquee from "@/components/marquee";
import FeedbackPausePS from "@/components/feedback-pause-ps";

const STORAGE_KEY_PREFIX = "battle-tube-tier-list-v2-wrapped";

export const PresentationStage: React.FC = () => {
  const {currentScreen, isPlaying, goToScreen, currentScreenIndex} = usePresentation();
  
  // Restore current screen from localStorage
  useEffect(() => {
    const savedScreenIndex = localStorage.getItem(`${STORAGE_KEY_PREFIX}:current-screen-index`);
    if (savedScreenIndex !== null) {
      const index = parseInt(savedScreenIndex, 10);
      if (!isNaN(index)) {
        goToScreen(index);
      }
    }
  }, [goToScreen]);

  // Save current screen to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}:current-screen-index`, String(currentScreenIndex));
  }, [currentScreenIndex]);

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
        <FeedbackPausePS/>
        <Player/>
      </div>
      
      {/* Footer abaixo da apresentação, acessível via scroll */}
      <div className={"py-5 bg-body"} style={{borderTop: "2.5px solid #000"}}>
        <Footer variant={"wrapped"}/>
      </div>
    </div>
  );
};
