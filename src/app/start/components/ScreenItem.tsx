'use client';

import React from 'react';
import {motion, Variants} from 'framer-motion';
import {ScreenItemData} from '@/resources/presentation';
import {Image} from 'react-bootstrap';

interface ScreenItemProps {
  item: ScreenItemData;
}

interface CustomProps {
  animation: string;
  delay: number;
}

const itemVariants: Variants = {
  initial: ({animation}: CustomProps) => {
    switch (animation) {
      case 'slide-up':
        return {opacity: 0, y: 50};
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
  },
  animate: ({delay}: CustomProps) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: delay
    }
  })
};

export const ScreenItem: React.FC<ScreenItemProps> = ({item}) => {
  const {type, content, animation, delay, style, className} = item;
  
  // Ajustes responsivos para estilos inline
  const responsiveStyle = {
    ...style,
    maxWidth: '100%',
    wordWrap: 'break-word' as const,
  };
  
  const renderContent = () => {
    switch (type) {
      case 'title':
        return <h1 className={className || "display-4 fw-bold text-center mb-3"} style={responsiveStyle}>{content as string}</h1>;
      case 'text':
        return <p className={className || "lead text-center mb-3"} style={responsiveStyle}>{content as string}</p>;
      case 'image':
        return <Image src={content as string} alt="Presentation content" fluid className={className || "rounded shadow-lg my-3"} style={responsiveStyle}/>;
      case 'iframe':
        return (
          <div className={`ratio ratio-16x9 w-100 my-3 overflow-hidden ${className || "rounded shadow-lg"}`} style={{maxWidth: '800px'}}>
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
      custom={{animation, delay}}
      className="w-100 d-flex"
    >
      {renderContent()}
    </motion.div>
  );
};
