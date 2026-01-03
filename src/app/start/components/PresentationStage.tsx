'use client';

import React from 'react';
import {AnimatePresence} from 'framer-motion';
import {usePresentation} from './PresentationProvider';
import {Screen} from './Screen';
import {ProgressBar} from './ProgressBar';
import {Controls} from './Controls';

export const PresentationStage: React.FC = () => {
  const {currentScreen} = usePresentation();
  
  return (
    <div className="d-flex flex-column vh-100 vw-100 overflow-hidden position-relative">
      <ProgressBar/>
      
      <div className="flex-grow-1 d-flex align-items-center justify-content-center w-100">
        <AnimatePresence mode="wait">
          <Screen key={currentScreen.id} data={currentScreen}/>
        </AnimatePresence>
      </div>
      
      <Controls/>
    </div>
  );
};
