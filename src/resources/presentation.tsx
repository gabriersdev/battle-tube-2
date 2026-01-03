import React from "react";
import Link from "next/link";
import Image from "next/image";
import {Badge, Button} from "react-bootstrap";

import Lib from "@/utils/lib";
import Iframe from "@/components/iframe";
import DiffInfo from "@/components/diff-info";

import ModIcon from "@/public/mod.png";
import VipIcon from "@/public/vip.png";
import SubIcon from "@/public/pou.png";
import KickLogo from "@/public/kick.svg";
import TwitchLogo from "@/public/twitch.jpg";
import E7TVAga from "@/public/7TV-aga.gif";
import E7TVAdmita from "@/public/7TV-admita.png";

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
  backgroundColor?: string; // Cor de fundo opcional para a tela
  backgroundClassName?: string; // Classe CSS para o fundo da tela
}

const defaultClassNames: {
  title: string,
  text: string,
  textSM: string
} = {
  title: 'text-balance text-purple-emphasis fw-semibold font-inter-tight mb-3 display-4 max-w-600',
  text: 'text-balance text-body-secondary fw-medium font-inter-tight mb-3 fs-2 lh-sm',
  textSM: 'text-balance text-small text-body-tertiary'
};

export const presentationData: ScreenData[] = [
  {
    id: 'screen-1',
    duration: 15,
    items: [
      {
        id: 'S1-I1',
        type: 'title',
        content: 'Este é o wrapped dos melhores clipes da live do eskimo em 2025',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.title.replace(/(max-w-600)/g, "")} mb-5`,
      },
      {
        id: 'S1-I2',
        type: 'text',
        content: 'Aqui, analisamos e compilamos dados dos clipes com mais visualizações, os mais melhores e engraçados (alguns não) que encontramos.',
        animation: 'slide-up',
        delay: 2,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S1-I3',
        type: 'text',
        content: 'Cada slide tem um tempo de exibição em tela mas você pode usar os controles na parte inferior da página para definir o que é exibido.',
        animation: 'slide-up',
        delay: 7,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S1-I4',
        type: 'text',
        content: 'Vamos começar!',
        animation: 'slide-up',
        delay: 12,
        className: `${defaultClassNames.text}`,
      },
    ],
    backgroundClassName: "bg-danger-subtle"
  },
  {
    id: 'screen-2',
    duration: 10,
    items: [
      {
        id: 'S2-I1',
        type: 'text',
        content: '2025 foi um ano com 365 dias...',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S2-I2',
        type: 'title',
        content: 'Em que 807 clipes foram feitos',
        animation: 'slide-up',
        delay: 1.5,
        className: `${defaultClassNames.title}`,
      },
      {
        id: 'S2-I3',
        type: 'text',
        content: 'Isso dá uma proporção de 2.21 clipes por dia',
        animation: 'slide-up',
        delay: 3,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S2-I4',
        type: 'component',
        content: (
          <div className={"mb-4"}>
            <div className={`d-flex gap-2 align-items-center flex-wrap ${defaultClassNames.text.replace(/mb-3/, "")}`}>
              <span>No total, foram feitos 760 clipes na</span>
              <Image src={TwitchLogo} alt={"Logo da Twitch"} width={32} height={32}/>
            </div>
            <DiffInfo beforeValue={3373} currentValue={760} text={"em comparação aos {bv} clipes de 2024"}/>
          </div>
        ),
        animation: 'slide-up',
        delay: 4.5,
      },
      {
        id: 'S2-I5',
        type: 'component',
        content: (
          <div className={"mb-3"}>
            <div className={`d-flex gap-2 align-items-center flex-wrap ${defaultClassNames.text.replace(/mb-3/, "")}`}>
              <span>E 47 clipes na</span>
              <Image src={KickLogo} alt={"Logo da KICK"} width={75} height={50}/>
            </div>
            <DiffInfo beforeValue={0} currentValue={47} text={"em comparação à {bv} em 2024"}/>
          </div>
        ),
        animation: 'slide-up',
        delay: 6,
      },
      {
        id: 'S2-I6',
        type: 'text',
        content: 'Os dados compilados ignoram todos os clipes feitos pelo eskimozin.',
        animation: 'slide-up',
        delay: 6,
        className: `${defaultClassNames.textSM}`,
      },
    ],
    backgroundClassName: "bg-primary-subtle"
  },
  {
    id: 'screen-3',
    duration: 10,
    items: [
      {
        id: 'S3-I1',
        type: 'text',
        content: 'O dia em que mais clipes foram feitos foi',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S3-I2',
        type: 'title',
        content: '12 de junho',
        animation: 'slide-up',
        delay: 1.5,
        className: `${defaultClassNames.title}`,
      },
      {
        id: 'S3-I3',
        type: 'text',
        content: 'Dia dos namorados',
        animation: 'slide-up',
        delay: 3,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S3-I4',
        type: 'component',
        content: (
          <div className={`${defaultClassNames.text} d-flex align-items-center gap-2 flex-wrap`}>
            <Image src={E7TVAdmita} alt={"Figurinha do 7TV 'Admita'"} width={32} height={32}/>
            <span>22</span>
            <span>clipes foram feitos neste dia</span>
          </div>
        ),
        animation: 'slide-up',
        delay: 4.5,
      },
      {
        id: 'S3-I5',
        type: 'text',
        content: 'Referente apenas à clipes feitos na Twitch e ignorando todos os clipes feitos pelo eskimozin.  A Subathon ocorreu entre 11 e 31 de julho.',
        animation: 'slide-up',
        delay: 4.5,
        className: `${defaultClassNames.textSM}`,
      },
    ],
    backgroundClassName: "bg-warning-subtle"
  },
  {
    id: 'screen-4',
    duration: 15,
    items: [
      {
        id: 'S4-I1',
        type: 'title',
        content: 'Os meses em que mais clipes foram feitos foi...',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.title.replace(/mb-3/, "mb-5")}`,
      },
      {
        id: 'S4-I2',
        type: 'component',
        content: (
          <div className={`${defaultClassNames.text} d-flex align-items-center gap-2  flex-wrap`}>
            <span>1. Julho</span>
            <Badge pill={true} bg={"primary"} className={"border-0 fw-normal fs-base font-inter"}>Subathon</Badge>
            <span>- com 190 clipes</span>
          </div>
        ),
        animation: 'slide-up',
        delay: 1.5,
      },
      {
        id: 'S4-I3',
        type: 'text',
        content: '2. Janeiro - com 182 clipes',
        animation: 'slide-up',
        delay: 3,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S4-I4',
        type: 'text',
        content: '3. Fevereiro - com 90 clipes',
        animation: 'slide-up',
        delay: 4.5,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S4-I5',
        type: 'text',
        content: '4. Março - com 52 clipes',
        animation: 'slide-up',
        delay: 6,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S4-I6',
        type: 'text',
        content: '5. Maio - com 46 clipes',
        animation: 'slide-up',
        delay: 7.5,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S4-I7',
        type: 'text',
        content: 'Referente apenas à clipes feitos na Twitch e ignorando todos os clipes feitos pelo eskimozin. A Subathon ocorreu entre 11 e 31 de julho.',
        animation: 'slide-up',
        delay: 7.5,
        className: `${defaultClassNames.textSM}`,
      },
    ],
    backgroundClassName: "bg-body-secondary"
  },
  {
    id: 'screen-5',
    duration: 15,
    items: [
      {
        id: 'S5-I1',
        type: 'title',
        content: 'Os maiores clippers de 2025 foram...',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.title}`,
      },
      {
        id: 'S5-I5',
        type: 'component',
        content: (
          <div className={`${defaultClassNames.text} d-flex align-items-center gap-2 flex-wrap`}>
            <span>1.</span>
            <Image src={ModIcon} alt={"Ícone de moderador na Twitch"} width={20} height={20} className={"rounded-1"}/>
            <span>rafuxo_2ne1</span>
            <span> - com 69 clipes</span>
          </div>
        ),
        animation: 'slide-up',
        delay: 1.5,
      },
      {
        id: 'S5-I6',
        type: 'component',
        content: (
          <div className={`${defaultClassNames.text} d-flex align-items-center gap-2 flex-wrap`}>
            <span>2.</span>
            <Image src={ModIcon} alt={"Ícone de moderador na Twitch"} width={20} height={20} className={"rounded-1"}/>
            <span>odraudinho</span>
            <span> - com 44 clipes</span>
          </div>
        ),
        animation: 'slide-up',
        delay: 3,
      },
      {
        id: 'S5-I7',
        type: 'component',
        content: (
          <div className={`${defaultClassNames.text} d-flex align-items-center gap-2 flex-wrap`}>
            <span>3.</span>
            <Image src={VipIcon} alt={"Ícone de vip na Twitch"} width={20} height={20} className={"rounded-1"}/>
            <span>pantaloreza__</span>
            <span> - com 23 clipes</span>
          </div>
        ),
        animation: 'slide-up',
        delay: 4.5,
      },
      {
        id: 'S5-I8',
        type: 'component',
        content: (
          <div className={`${defaultClassNames.text} d-flex align-items-center gap-2 flex-wrap`}>
            <span>4.</span>
            <Image src={ModIcon} alt={"Ícone de moderador na Twitch"} width={20} height={20} className={"rounded-1"}/>
            <span>kkkkkinho</span>
            <span> - com 21 clipes</span>
          </div>
        ),
        animation: 'slide-up',
        delay: 6,
      },
      {
        id: 'S5-I9',
        type: 'component',
        content: (
          <div className={`${defaultClassNames.text} d-flex align-items-center gap-2 flex-wrap`}>
            <span>5.</span>
            <Image src={SubIcon} alt={"Ícone de sub na Twitch do Eskimozin"} width={20} height={20} className={"rounded-1"}/>
            <span>tinhaqueserotomtom</span>
            <span> - com 15 clipes</span>
          </div>
        ),
        animation: 'slide-up',
        delay: 7.5,
      },
      {
        id: 'S5-I10',
        type: 'text',
        content: 'Referente apenas à clipes feitos na Twitch e ignorando todos os clipes feitos pelo eskimozin.',
        animation: 'slide-up',
        delay: 7.5,
        className: `${defaultClassNames.textSM}`,
      },
    ],
    backgroundClassName: "bg-info-secondary"
  },
  {
    id: 'screen-6',
    duration: 20,
    items: [
      {
        id: 'S6-I1',
        type: 'title',
        content: 'O clipe mas visto foi...',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.title}`,
      },
      {
        id: 'S6-I2',
        type: 'component',
        content: (
          <div className={`${defaultClassNames.text}`}>
            <span>{'"'}vamo fazer uma sacanagem com esse sapo{'"'}</span>
            <div className={"d-flex align-items-center flex-wrap gap-1 fs-base font-inter fw-normal mt-1"}>
              <span>clipado por</span>
              <div className={"d-inline-flex gap-1 align-items-center flex-wrap"}>
                <Image src={ModIcon} alt={"Ícone de moderador na Twitch"} width={13} height={13} style={{borderRadius: "1.5px"}}/>
                <span> odraudinho</span>
              </div>
              <span>em 26 de janeiro</span>
            </div>
          </div>),
        animation: 'slide-up',
        delay: 1.5,
      },
      {
        id: 'S6-I5',
        type: 'component',
        content: (
          <div>
            <Iframe id={Lib.getClipID({url: "https://www.twitch.tv/eskimozin/clip/BravePunchySpiderRuleFive-vfrwOYGy1fsIqhCv"})} style={{width: "max(100%, 700px)", height: "max(400px, 500px)"}}/>
          </div>
        ),
        animation: 'slide-up',
        delay: 3,
      },
      {
        id: 'S6-I4',
        type: 'text',
        content: (
          <div className={`mb-3 d-flex gap-1 mt-2 flex-column ${defaultClassNames.text}`}>
            <span>com 1.278 visualizações</span>
            <DiffInfo beforeValue={911} currentValue={1278} text={"em comparação as {bv} visualizações que o clipe mais visto em 2024 tinha em 31 dez. 2024"}/>
          </div>
        ),
        animation: 'slide-up',
        delay: 4.5,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S6-I6',
        type: 'text',
        content: 'Os dados compilados ignoram todos os clipes feitos pelo eskimozin.',
        animation: 'slide-up',
        delay: 4.5,
        className: `${defaultClassNames.textSM}`,
      },
    ],
    backgroundClassName: "bg-danger-subtle"
  },
  {
    id: 'screen-7',
    duration: 15,
    items: [
      {
        id: 'S7-I1',
        type: 'title',
        content: 'Todos os clipes da Twitch somaram juntos',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.title}`,
      },
      {
        id: 'S7-I2',
        type: 'title',
        content: '13.184 visualizações',
        animation: 'slide-up',
        delay: 1.5,
        className: `${defaultClassNames.title.replace("text-purple-emphasis", "text-primary-emphasis")}`,
      },
      {
        id: 'S7-I3',
        type: 'component',
        content: (
          <div className={"mb-3"}>
            <DiffInfo beforeValue={37729} currentValue={13184} text={"em comparação as {bv} visualizações que os clipes feitos em 2024 tinham em 31 dez. 2024"}/>
          </div>
        ),
        animation: 'slide-up',
        delay: 3,
      },
      {
        id: 'S7-I4',
        type: 'text',
        content: 'Referente apenas à clipes feitos na Twitch e ignorando todos os clipes feitos pelo eskimozin.',
        animation: 'slide-up',
        delay: 3,
        className: `${defaultClassNames.textSM}`,
      },
    ],
    backgroundClassName: "bg-primary-subtle"
  },
  {
    id: 'screen-8',
    duration: 10,
    items: [
      {
        id: 'S8-I1',
        type: 'title',
        content: 'Uma cor representou as lives em 2025...',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.title.replace(/text-purple-emphasis/g, "text-primary-emphasis")}`,
      },
      {
        id: 'S8-I2',
        type: 'text',
        content: 'E ela não foi roxo...',
        animation: 'slide-up',
        delay: 4.5,
        className: `${defaultClassNames.text}`,
      },
    ],
    backgroundClassName: 'gradient-area'
  },
  {
    id: 'screen-9',
    duration: 10,
    items: [
      {
        id: 'S9-I1',
        type: 'title',
        content: 'Verde!',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.title.replace("text-purple-emphasis", "text-success-emphasis")}`,
      },
      {
        id: 'S9-I2',
        type: 'text',
        content: 'A cor verde representa renovação, crescimento, novos ciclos, transformação positiva e melhoria.',
        animation: 'slide-up',
        delay: 1.5,
        className: `${defaultClassNames.text} max-w-800`,
      },
    ],
    backgroundClassName: 'bg-success-subtle',
  },
  {
    id: 'screen-10',
    duration: 10,
    items: [
      {
        id: 'S10-I1',
        type: 'title',
        content: 'Em 2025...',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.title.replace(/(text-balance|max-w-600)/g, "")}`,
      },
      {
        id: 'S10-I3',
        type: 'text',
        content: 'Vimos o ano virar na casa do Camponez',
        animation: 'slide-up',
        delay: 1,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S10-I2',
        type: 'text',
        content: 'Vimos a saída do albergue',
        animation: 'slide-up',
        delay: 2.5,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S10-I4',
        type: 'text',
        content: 'E a chegada em São Paulo na Incidente House.',
        animation: 'slide-up',
        delay: 4,
        className: `${defaultClassNames.text}`,
      },
    ],
    backgroundClassName: "bg-warning-subtle"
  },
  {
    id: 'screen-11',
    duration: 7.5,
    items: [
      {
        id: 'S11-I1',
        type: 'title',
        content: 'Vimos o canal de cortes bater 100K no Youtube...',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.title.replace(/(text-balance|max-w-600)/g, "")}`,
      },
      {
        id: 'S11-I2',
        type: 'text',
        content: 'Quase 90K no Instagram...',
        animation: 'slide-up',
        delay: 1.5,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S11-I3',
        type: 'text',
        content: 'A mudança de plataforma...',
        animation: 'slide-up',
        delay: 3,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S11-I4',
        type: 'text',
        content: 'Tudo em um só ano.',
        animation: 'slide-up',
        delay: 4.5,
        className: `${defaultClassNames.text}`,
      },
    ],
    backgroundClassName: "bg-body-secondary"
  },
  {
    id: 'screen-12',
    duration: 30,
    items: [
      {
        id: 'S12-I1',
        type: 'title',
        content: 'Que 2026 seja foda para os eskimoviewers, eskimolovers, eskimofãs e eskimozettes',
        animation: 'slide-up',
        delay: 0,
        className: `${defaultClassNames.title.replace(/(text-balance|max-w-600)/g, "")}`,
      },
      {
        id: 'S12-I2',
        type: 'component',
        content: (
          <div className={`${defaultClassNames.text} d-flex align-items-center gap-2 flex-wrap`}>
            E para o eskimo também
            <Image src={E7TVAga} alt={"Figurinha sorrindo da 7TV"} width={32} height={32}/>
          </div>
        ),
        animation: 'slide-up',
        delay: 3,
      },
      {
        id: 'S12-I3',
        type: 'text',
        content: 'Vamos para tier list!?',
        animation: 'slide-up',
        delay: 4.5,
        className: `${defaultClassNames.text}`,
      },
      {
        id: 'S12-I4',
        type: 'component',
        content: (
          <Link href={"/tier-list"}>
            <Button variant={"primary"}>
              <span className={"fs-base"}>
                Ir para a tier list
              </span>
            </Button>
          </Link>
        ),
        animation: 'slide-up',
        delay: 4.5,
      },
    ],
    backgroundClassName: "bg-info-secondary"
  },
];
