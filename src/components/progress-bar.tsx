'use client';

import React, {useEffect} from 'react';
import {motion, useAnimation} from 'framer-motion';
import {usePresentation} from './presentation-provider';
import {presentationData} from '@/resources/presentation';

export const ProgressBar: React.FC = () => {
  const {currentScreenIndex, isPlaying, remainingTime, goToScreen} = usePresentation();
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        padding: '10px',
        gap: '5px'
      }}
    >
      {presentationData.map((screen, index) => {
        const isActive = index === currentScreenIndex;
        const isPast = index < currentScreenIndex;
        
        return (
          <div
            key={screen.id}
            onClick={() => goToScreen(index)}
            style={{
              flex: 1,
              height: '4px',
              backgroundColor: '#00000015',
              borderRadius: '2px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative' // Para garantir que o clique funcione bem
            }}
          >
            {/* Área de clique expandida invisível para facilitar o toque/clique */}
            <div style={{position: 'absolute', top: '-10px', bottom: '-10px', left: 0, right: 0, zIndex: 1}} />
            
            <ProgressItem
              isActive={isActive}
              isPast={isPast}
              isPlaying={isPlaying}
              duration={screen.duration * 1000}
              remainingTime={isActive ? remainingTime : 0}
            />
          </div>
        );
      })}
    </div>
  );
};

interface ProgressItemProps {
  isActive: boolean;
  isPast: boolean;
  isPlaying: boolean;
  duration: number;
  remainingTime: number;
}

const ProgressItem: React.FC<ProgressItemProps> = ({isActive, isPast, isPlaying, duration, remainingTime}) => {
  const controls = useAnimation();
  
  useEffect(() => {
    // Parar qualquer animação em andamento imediatamente ao mudar de estado
    controls.stop();

    if (isPast) {
      controls.set({width: '100%'});
    } else if (!isActive) {
      controls.set({width: '0%'});
    } else {
      // É o slide ativo
      if (isPlaying) {
        // Se está tocando, anima do ponto atual até 100%
        const initialProgress = Math.max(0, 1 - (remainingTime / duration));
        
        controls.set({width: `${initialProgress * 100}%`});
        
        controls.start({
          width: '100%',
          transition: {
            duration: remainingTime / 1000, // Converte ms para segundos
            ease: 'linear'
          }
        });
      } else {
        // Se está pausado, define a largura estática baseada no tempo restante
        const currentProgress = Math.max(0, 1 - (remainingTime / duration));
        controls.set({width: `${currentProgress * 100}%`});
      }
    }
  }, [isActive, isPast, isPlaying, remainingTime, duration, controls]);
  
  return (
    <motion.div
      animate={controls}
      style={{
        height: '100%',
        backgroundColor: '#00000030',
        width: '0%' // Valor inicial padrão
      }}
    />
  );
};
