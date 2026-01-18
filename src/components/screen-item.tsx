'use client';

import React, {useEffect, useRef, useState} from 'react';
import {motion, useAnimation, Variants} from 'framer-motion';
import {ScreenItemData} from '@/resources/presentation';
import {Image} from 'react-bootstrap';
import {usePresentation} from './presentation-provider';

interface ScreenItemProps {
  item: ScreenItemData;
  isPlaying?: boolean;
}

interface CustomProps {
  animation: string;
}

const itemVariants: Variants = {
  initial: ({animation}: CustomProps) => {
    switch (animation) {
      case 'slide-up':
        return {opacity: 0, y: 15};
      case 'slide-down':
        return {opacity: 0, y: -50};
      case 'slide-left':
        return {opacity: 0, x: 50};
      case 'slide-right':
        return {opacity: 0, x: -50};
      case 'scale':
        return {opacity: 0, scale: 0.8};
      case 'fade':
      default:
        return {opacity: 0};
    }
  }
};

export const ScreenItem: React.FC<ScreenItemProps> = ({item, isPlaying = true}) => {
  const {type, content, animation, delay, style, className} = item;
  const {currentScreen, remainingTime} = usePresentation();
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);
  const wasPaused = useRef(false);
  
  // Ajustes responsivos para estilos inline
  const responsiveStyle = {
    ...style,
    maxWidth: '100%',
    wordWrap: 'break-word' as const,
  };
  
  useEffect(() => {
    if (isPlaying) {
      let delayToUse = delay;
      
      // Se estava pausado, precisamos descontar o tempo que já passou
      if (wasPaused.current) {
        const totalDuration = currentScreen.duration * 1000;
        // O remainingTime é atualizado quando pausa, então reflete o tempo restante naquele momento
        const elapsedSec = (totalDuration - remainingTime) / 1000;
        delayToUse = Math.max(0, delay - elapsedSec);
      }
      
      if (!hasAnimated) {
        controls.start({
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: 'easeOut',
            delay: delayToUse
          }
        }).then(() => {
          // Só marcamos como animado se a animação completou (não foi interrompida)
          // O then() do controls.start pode disparar se for interrompido? 
          // Geralmente dispara quando termina. Se for interrompido por stop(), pode lançar ou não resolver.
          // Mas para garantir, setamos true. Se pausar antes de terminar, o stop() é chamado.
          // Se o stop() for chamado, a animação para. Ao retomar, delayToUse será 0 (ou o restante) e animará o resto.
          // Se já tiver terminado visualmente, animar de 1 pra 1 não tem problema.
          setHasAnimated(true);
        });
      }
      
      wasPaused.current = false;
      
    } else {
      controls.stop();
      wasPaused.current = true;
    }
  }, [isPlaying, delay, currentScreen.duration, remainingTime, controls, hasAnimated]);
  
  const renderContent = () => {
    switch (type) {
      case 'title':
        return <h1 className={className ? className : "display-4 fw-bold text-center mb-3"} style={responsiveStyle}>{content as string}</h1>;
      case 'text':
        return <p className={className ? className : "fs-base text-center mb-3"} style={responsiveStyle}>{content as string}</p>;
      case 'image':
        return <Image src={content as string} alt="Presentation content" fluid className={className ? className : "rounded shadow-lg my-3"} style={responsiveStyle}/>;
      case 'iframe':
        return (
          <div className={`ratio ratio-16x9 w-100 my-3 overflow-hidden ${className ? className : "rounded shadow-lg"}`} style={{maxWidth: '800px'}}>
            <iframe src={content as string} title="Embedded content" allowFullScreen style={{border: 0}}/>
          </div>
        );
      case 'component':
        return <div className={className} style={responsiveStyle}>{content}</div>;
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate={controls}
      custom={{animation}}
      className="w-100 d-flex"
    >
      {renderContent()}
    </motion.div>
  );
};
