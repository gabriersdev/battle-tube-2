import React from "react";

export type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale';

export interface ScreenItem {
  id: string;
  type: 'title' | 'text' | 'image' | 'iframe';
  content: string;
  animation: AnimationType;
  delay: number; // Delay in seconds relative to screen start
  className?: string; // Bootstrap classes
  style?: React.CSSProperties; // Inline styles (optional override)
}

export interface ScreenData {
  id: string;
  duration: number; // Duration in seconds
  items: ScreenItem[];
}

const defaultClassNames = {
  title: 'text-balance text-purple-emphasis fw-semibold font-inter-tight mb-3 fs-42',
};

export const presentationData: ScreenData[] = [
  {
    id: 'screen-1',
    duration: 8,
    items: [
      {
        id: 'title-1',
        type: 'title',
        content: 'Bem-vindo ao Sistema',
        animation: 'slide-up',
        delay: 0,
        className: defaultClassNames.title,
      },
      {
        id: 'text-1',
        type: 'text',
        content: 'Apresentação dinâmica com Next.js e Framer Motion',
        animation: 'fade',
        delay: 0.5,
        className: 'text-balance text-success-emphasis h2'
      },
    ]
  },
  {
    id: 'screen-2',
    duration: 10,
    items: [
      {
        id: 'title-2',
        type: 'title',
        content: 'Conteúdo Multimídia',
        animation: 'slide-left',
        delay: 0,
        className: defaultClassNames.title
      },
      {
        id: 'text-2',
        type: 'text',
        content: 'Suporte para iframes e vídeos externos.',
        animation: 'slide-right',
        delay: 0.5,
        className: 'text-body h4 mb-4'
      },
      {
        id: 'iframe-1',
        type: 'iframe',
        content: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0',
        animation: 'fade',
        delay: 1.5,
        className: 'rounded-4'
      }
    ]
  }
];
