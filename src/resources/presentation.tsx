import React from "react";
import {ScreenItem} from "@/app/start/components/ScreenItem";

export type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale';

export interface ScreenItemData {
  id: string;
  type: 'title' | 'text' | 'image' | 'iframe' | 'component';
  content: string | React.ReactNode;
  animation: AnimationType;
  delay: number; // Delay in seconds relative to screen start
  className?: string; // Bootstrap classes
  style?: React.CSSProperties; // Inline styles (optional override)
}

export interface ScreenData {
  id: string;
  duration: number; // Duration in seconds
  items: ScreenItemData[];
}

export const presentationData: ScreenData[] = [
  {
    id: 'screen-1',
    duration: 10,
    items: [
      {
        id: 's1-i1',
        type: 'title',
        content: 'Esta é a tier-list dos melhores clipes da live em 2025',
        animation: 'slide-up',
        delay: 0,
      },
      {
        id: 's1-i2',
        type: 'text',
        content: 'Aqui, analisamos e compilamos dados dos clipes com mais visualizações, os mais melhores e engraçados que encontramos',
        animation: 'fade',
        delay: 0.5,
      },
      {
        id: 's1-i3',
        type: 'text',
        content: 'Vamos começar...',
        animation: 'fade',
        delay: 1.0,
      },
    ]
  },
  {
    id: 'screen-2',
    duration: 10,
    items: [
      {
        id: 's2-i1',
        type: 'text',
        content: '2025 foi um ano com 365 dias...',
        animation: 'fade',
        delay: 0,
      },
      {
        id: 's2-i2',
        type: 'title',
        content: 'Em que foram feitos 807 clipes',
        animation: 'slide-up',
        delay: 0.5,
      },
      {
        id: 's2-i3',
        type: 'text',
        content: 'Proporção 2.21 clipes por dia',
        animation: 'fade',
        delay: 1.0,
      },
      {
        id: 's2-i4',
        type: 'text',
        content: 'Sendo 760 na Twitch - em comparação aos 3.373 clipes de 2024',
        animation: 'fade',
        delay: 1.5,
      },
      {
        id: 's2-i5',
        type: 'text',
        content: 'E 47 na Kick + em comparação à zero em 2024',
        animation: 'fade',
        delay: 2.0,
      },
      {
        id: 's2-i6',
        type: 'text',
        content: 'Os dados compilados ignoram todos os clipes feitos pelo eskimozin.',
        animation: 'fade',
        delay: 2.5,
      },
    ]
  },
  {
    id: 'screen-3',
    duration: 10,
    items: [
      {
        id: 's3-i1',
        type: 'text',
        content: 'O dia em que mais clipes foram feitos foi',
        animation: 'fade',
        delay: 0,
      },
      {
        id: 's3-i2',
        type: 'title',
        content: '12 de junho',
        animation: 'slide-up',
        delay: 0.5,
      },
      {
        id: 's3-i3',
        type: 'text',
        content: 'Esse foi o 2º dia da Subathon',
        animation: 'fade',
        delay: 1.0,
      },
      {
        id: 's3-i4',
        type: 'text',
        content: 'E 22 clipes foram clipados neste dia',
        animation: 'fade',
        delay: 1.5,
      },
      {
        id: 's3-i5',
        type: 'text',
        content: 'Referente apenas à clipes feitos na Twitch e ignorando todos os clipes feitos pelo eskimozin.',
        animation: 'fade',
        delay: 2.0,
      },
    ]
  },
  {
    id: 'screen-4',
    duration: 10,
    items: [
      {
        id: 's4-i1',
        type: 'title',
        content: 'Os meses em que mais clipes foram feitos foi...',
        animation: 'slide-up',
        delay: 0,
      },
      {
        id: 's4-i2',
        type: 'text',
        content: 'Julho Subathon, com 190 clipes',
        animation: 'fade',
        delay: 0.5,
      },
      {
        id: 's4-i3',
        type: 'text',
        content: 'Janeiro, com 182 clipes',
        animation: 'fade',
        delay: 1.0,
      },
      {
        id: 's4-i4',
        type: 'text',
        content: 'Fevereiro, com 90 clipes',
        animation: 'fade',
        delay: 1.5,
      },
      {
        id: 's4-i5',
        type: 'text',
        content: 'Março, com 52',
        animation: 'fade',
        delay: 2.0,
      },
      {
        id: 's4-i6',
        type: 'text',
        content: 'E Maio com 46 clipes',
        animation: 'fade',
        delay: 2.5,
      },
      {
        id: 's4-i7',
        type: 'text',
        content: 'Referente apenas à clipes feitos na Twitch e ignorando todos os clipes feitos pelo eskimozin.',
        animation: 'fade',
        delay: 3.0,
      },
    ]
  },
  {
    id: 'screen-5',
    duration: 10,
    items: [
      {
        id: 's5-i1',
        type: 'title',
        content: 'Os maiores clippers de 2025 foram...',
        animation: 'slide-up',
        delay: 0,
      },
      {
        id: 's5-i2',
        type: 'text',
        content: '(Rufem os tambores)',
        animation: 'fade',
        delay: 0.5,
      },
      {
        id: 's5-i3',
        type: 'text',
        content: '(Tã tã tã tã)',
        animation: 'fade',
        delay: 1.0,
      },
      {
        id: 's5-i4',
        type: 'text',
        content: '(Tã tã tã tã)',
        animation: 'fade',
        delay: 1.5,
      },
      {
        id: 's5-i5',
        type: 'text',
        content: 'rafuxo_2ne1, com 69 clipes',
        animation: 'fade',
        delay: 2.0,
      },
      {
        id: 's5-i6',
        type: 'text',
        content: 'odraudinho, com 44 clipes',
        animation: 'fade',
        delay: 2.5,
      },
      {
        id: 's5-i7',
        type: 'text',
        content: 'pantaloreza__,com 23 clipes',
        animation: 'fade',
        delay: 3.0,
      },
      {
        id: 's5-i8',
        type: 'text',
        content: 'kkkkkinho, com 21 clipes',
        animation: 'fade',
        delay: 3.5,
      },
      {
        id: 's5-i9',
        type: 'text',
        content: 'tinhaqueserotomtom, com 15 clipes',
        animation: 'fade',
        delay: 4.0,
      },
      {
        id: 's5-i10',
        type: 'text',
        content: 'Referente apenas à clipes feitos na Twitch e ignorando todos os clipes feitos pelo eskimozin.',
        animation: 'fade',
        delay: 4.5,
      },
    ]
  },
  {
    id: 'screen-6',
    duration: 10,
    items: [
      {
        id: 's6-i1',
        type: 'title',
        content: 'O clipe mas visto foi...',
        animation: 'slide-up',
        delay: 0,
      },
      {
        id: 's6-i2',
        type: 'text',
        content: 'vamo fazer uma sacanagem com esse sapo',
        animation: 'fade',
        delay: 0.5,
      },
      {
        id: 's6-i3',
        type: 'text',
        content: 'clipado por odraudinho em 26 de janeiro',
        animation: 'fade',
        delay: 1.0,
      },
      {
        id: 's6-i4',
        type: 'text',
        content: 'com 1.278 visualizações + em comparação as 911 visualizações que o clipe mais visto em 2024 tinha em 31 dez. 2024',
        animation: 'fade',
        delay: 1.5,
      },
      {
        id: 's6-i5',
        type: 'text',
        content: 'https://www.twitch.tv/eskimozin/clip/BravePunchySpiderRuleFive-vfrwOYGy1fsIqhCv',
        animation: 'fade',
        delay: 2.0,
      },
      {
        id: 's6-i6',
        type: 'text',
        content: 'Os dados compilados ignoram todos os clipes feitos pelo eskimozin.',
        animation: 'fade',
        delay: 2.5,
      },
    ]
  },
  {
    id: 'screen-7',
    duration: 10,
    items: [
      {
        id: 's7-i1',
        type: 'title',
        content: 'Todos os clipes da Twitch somaram juntos',
        animation: 'slide-up',
        delay: 0,
      },
      {
        id: 's7-i2',
        type: 'title',
        content: '13.184 visualizações',
        animation: 'fade',
        delay: 0.5,
      },
      {
        id: 's7-i3',
        type: 'text',
        content: '- em comparação as 37.729 visualizações que os clipes feitos em 2024 tinham em 31 dez. 2024',
        animation: 'fade',
        delay: 1.0,
      },
      {
        id: 's7-i4',
        type: 'text',
        content: 'Referente apenas à clipes feitos na Twitch e ignorando todos os clipes feitos pelo eskimozin.',
        animation: 'fade',
        delay: 1.5,
      },
    ]
  },
  {
    id: 'screen-8',
    duration: 10,
    items: [
      {
        id: 's8-i1',
        type: 'title',
        content: 'Uma cor representou as lives em 2025...',
        animation: 'slide-up',
        delay: 0,
      },
      {
        id: 's8-i2',
        type: 'text',
        content: 'E ela não foi roxo...',
        animation: 'fade',
        delay: 0.5,
      },
    ]
  },
  {
    id: 'screen-9',
    duration: 10,
    items: [
      {
        id: 's9-i1',
        type: 'title',
        content: 'Verde',
        animation: 'slide-up',
        delay: 0,
      },
      {
        id: 's9-i2',
        type: 'text',
        content: 'Segundo o ChatGPT, a cor verde representa renovação, crescimento, novos ciclos, transformação positiva forte em contextos de sustentabilidade e melhoria.',
        animation: 'fade',
        delay: 0.5,
      },
    ]
  },
  {
    id: 'screen-10',
    duration: 10,
    items: [
      {
        id: 's10-i1',
        type: 'title',
        content: 'Viramos o ano na casa do Camponez',
        animation: 'slide-up',
        delay: 0,
      },
      {
        id: 's10-i2',
        type: 'title',
        content: 'Voltamos para o albergue',
        animation: 'fade',
        delay: 0.5,
      },
      {
        id: 's10-i3',
        type: 'title',
        content: 'E de repente...',
        animation: 'fade',
        delay: 1.0,
      },
      {
        id: 's10-i4',
        type: 'title',
        content: 'Aparecemos em São Paulo...',
        animation: 'fade',
        delay: 1.5,
      },
      {
        id: 's10-i5',
        type: 'title',
        content: 'Na Incidente House.',
        animation: 'fade',
        delay: 2.0,
      },
    ]
  },
  {
    id: 'screen-11',
    duration: 10,
    items: [
      {
        id: 's11-i1',
        type: 'title',
        content: 'Batemos 100K no Youtube...',
        animation: 'slide-up',
        delay: 0,
      },
      {
        id: 's11-i2',
        type: 'text',
        content: 'Quase 90K no Instagram...',
        animation: 'fade',
        delay: 0.5,
      },
      {
        id: 's11-i3',
        type: 'text',
        content: 'Migramos de plataforma (RIP Twitch)...',
        animation: 'fade',
        delay: 1.0,
      },
      {
        id: 's11-i4',
        type: 'text',
        content: 'Tudo isso em 2025',
        animation: 'fade',
        delay: 1.5,
      },
    ]
  },
  {
    id: 'screen-12',
    duration: 10,
    items: [
      {
        id: 's12-i1',
        type: 'title',
        content: 'Que 2026 seja foda para os eskimoviewers, eskimolovers, eskimofãs e eskimozettes',
        animation: 'slide-up',
        delay: 0,
      },
      {
        id: 's12-i2',
        type: 'text',
        content: 'E que o eskimo assine a carteira de todos os mods :aga:',
        animation: 'fade',
        delay: 0.5,
      },
      {
        id: 's12-i3',
        type: 'text',
        content: 'Chega de falação e vamos pra tier list...',
        animation: 'fade',
        delay: 1.0,
      },
    ]
  },
];
