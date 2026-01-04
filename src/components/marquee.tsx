import React from 'react';
import Image from "next/image";

export type MarqueeItemType = string | React.ReactNode;

interface MarqueeProps {
  items?: MarqueeItemType[];
}

const DEFAULT_ITEMS: MarqueeItemType[] = [
  "/clips-gif/1.gif",
  '"Esse telefone é do maico?" - NILO, Algum',
  "/clips-gif/3.gif",
  '"Eu tinha três camisas social" - GROBOTH, Thiago',
  "/clips-gif/2.gif",
  '"Quem não macetaria o gabriers?"',
  "/clips-gif/5.gif",
  '"NÃO EDU!" - ESKIMOZIN, João',
  "/clips-gif/3.gif",
  '"Pepetino namoral..." - JONES, David',
  '"Fale por você" - DESCONHECIDO, Autor',
  "/clips-gif/2.gif",
  '"A terceira hoje" - ESKIMOZIN, João',
  "/clips-gif/4.gif",
  '"Eu prefiro um suco" - DESCONHECIDO, Autor',
];

const IMAGE_EXTENSIONS_REGEX = /\.(jpg|jpeg|png|gif|webp|svg)$/i;

export default function Marquee({items = DEFAULT_ITEMS}: MarqueeProps) {
  
  const renderContent = (item: MarqueeItemType) => {
    if (typeof item === 'string') {
      // Verifica se é uma URL de imagem
      if (IMAGE_EXTENSIONS_REGEX.test(item)) {
        return (
          <Image
            src={item}
            alt="Item do marquee"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
              display: 'block',
              borderRadius: 'inherit'
            }}
            width={1500}
            height={1500}
          />
        );
      }
      // Retorna texto simples
      return <span className={"px-3 text-center text-balance py-1"}>{item}</span>;
    }
    // Retorna componente React
    return item;
  };
  
  return (
    <div>
      <article className="marquee-wrapper marquee-wrapper-vertical bg-danger-subtle">
        {/* Coluna 1 - Scroll Normal */}
        <div className="marquee marquee-vertical">
          <div className="marquee-group">
            {items.map((item, index) => (
              <div key={`g1-${index}`} className="marquee-item position-relative">
                {renderContent(item)}
              </div>
            ))}
          </div>
          
          <div aria-hidden="true" className="marquee-group">
            {items.map((item, index) => (
              <div key={`g1-clone-${index}`} className="marquee-item position-relative">
                {renderContent(item)}
              </div>
            ))}
          </div>
        </div>
        
        {/* Coluna 2 - Scroll Reverso */}
        <div className="marquee marquee-vertical marquee-reverse">
          <div className="marquee-group">
            {items.map((item, index) => (
              <div key={`g2-${index}`} className="marquee-item">
                {renderContent(item)}
              </div>
            ))}
          </div>
          
          <div aria-hidden="true" className="marquee-group">
            {items.map((item, index) => (
              <div key={`g2-clone-${index}`} className="marquee-item">
                {renderContent(item)}
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}