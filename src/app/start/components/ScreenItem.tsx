'use client';

import React from 'react';
import {motion, Variants} from 'framer-motion';
import {ScreenItem as ScreenItemType} from '@/resources/presentation';
import {Image} from 'react-bootstrap';

interface ScreenItemProps {
  item: ScreenItemType;
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
        return <h1 className={className || "display-4 fw-bold text-center mb-3"} style={responsiveStyle}>{content}</h1>;
      case 'text':
        return <p className={className || "lead text-center mb-3"} style={responsiveStyle}>{content}</p>;
      case 'image':
        return <Image src={content} alt="Presentation content" fluid className={className || "rounded shadow-lg my-3"} style={responsiveStyle}/>;
      case 'iframe':
        return (
          <div className={`ratio ratio-16x9 w-100 my-3 overflow-hidden ${className || "rounded shadow-lg"}`} style={{maxWidth: '800px'}}>
            <iframe src={content} title="Embedded content" allowFullScreen style={{border: 0}}/>
          </div>
        );
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
