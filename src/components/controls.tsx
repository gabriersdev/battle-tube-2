'use client';

import React from 'react';
import {usePresentation} from './presentation-provider';
import {Button, ButtonGroup} from 'react-bootstrap';

export const Controls: React.FC = () => {
  const {currentScreenIndex, previousScreen, nextScreen, togglePlay, isPlaying} = usePresentation();
  
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}
    >
      <ButtonGroup>
        <Button variant="outline-light" className={currentScreenIndex === 0 ? "pointer-events-none opacity-50 cursor-not-allowed" : ""} onClick={() => {
          if (currentScreenIndex > 0) previousScreen();
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </Button>
        <Button variant="outline-light" onClick={togglePlay} onKeyDown={(e) => {
          if (e.key === ' ') e.preventDefault();
        }}>
          <span className={"text-small"}>
            {isPlaying ? 'Pausar' : 'Play'}
          </span>
        </Button>
        <Button variant="outline-light" onClick={nextScreen}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
        </Button>
      </ButtonGroup>
    </div>
  );
};
